<template>
   <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
         <q-card-section class="bg-purple-4 text-white">
            <div class="row">
               <div class="col-12 col-md-6">
                  <div class="text-h6 h_titleHead">Lapak</div>
                  <!-- <div class="text-subtitle2">Jenis Lapak</div> -->
               </div>
               <div class="col-12 col-md-2"></div>
               <div class="col-12 col-md-4">
                  <div class="row">
                     <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white"
                        style="width:90%" />
                     <q-btn glossy class="bg-yellow-9" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                        <q-tooltip content-class="bg-yellow-9" content-style="font-size: 13px">
                           Click untuk menambah data
                        </q-tooltip>
                     </q-btn>
                  </div>

               </div>
            </div>
         </q-card-section>

         <q-separator dark inset />


         <q-card-section>
            <hr class="hrpagin2">


            <div class="tbl_responsive">
               <!-- =================================================== KONTENT =========================================================== -->
               <table width="100%">
                  <tr class="h_table_head bg-purple-2">
                     <th width="10%" class="text-center">No</th>
                     <th width="70%">Uraian</th>
                     <th width="20%"></th>
                  </tr>
                  <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                     <td class="text-center">{{ indexing(index + 1) }}.</td>
                     <td>{{ data.uraian }}</td>
                     <td class="text-center">
                        <q-btn-group>
                           <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create"
                              class="tbl_btn">
                              <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                 Click untuk mengubah data ini
                              </q-tooltip>
                           </q-btn>
                           <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative"
                              icon="delete_forever" class="tbl_btn">
                              <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                 Click untuk menghapus data ini
                              </q-tooltip>
                           </q-btn>
                        </q-btn-group>
                     </td>
                  </tr>

               </table>

               <!-- =================================================== KONTENT =========================================================== -->
            </div>
            <br><br>
            <div class="row">
               <div class="col-12 col-md-4 listLapak" v-for="data in 9" :key="data">
                  <q-card class="my-card" flat bordered>
                     <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                     <q-card-section>
                        <q-btn fab color="primary" icon="place" class="absolute"
                           style="top: 0; right: 12px; transform: translateY(-50%);" />

                        <div class="row no-wrap items-center">
                           <div class="col text-h6 ellipsis">
                              Cafe Basilico
                           </div>
                           <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                              <q-icon name="place" />
                              250 ft
                           </div>
                        </div>

                        <q-rating v-model="stars" :max="5" size="32px" />
                     </q-card-section>

                     <q-card-section class="q-pt-none">
                        <div class="text-subtitle1">
                           $・Italian, Cafe
                        </div>
                        <div class="text-caption text-grey">
                           Small plates, salads & sandwiches in an intimate setting.
                        </div>
                     </q-card-section>

                     <q-separator />

                     <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat color="primary">
                           Reserve
                        </q-btn>
                     </q-card-actions>
                  </q-card>
               </div> <br><br>
            </div>
            <div class="q-pa-md row items-start q-gutter-md">
               <q-card v-for="lapak in dataLapak" :key="lapak.id" class="my-card" flat bordered>
                  <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                  <q-card-section>
                     <q-btn fab color="primary" icon="place" class="absolute"
                        style="top: 0; right: 12px; transform: translateY(-50%);" />

                     <div class="row no-wrap items-center">
                        <div class="col text-h6 ellipsis">
                           {{ lapak.namaPemilik }} — {{ lapak.jenisLapak }}
                        </div>
                        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                           <q-icon name="place" />
                           {{ lapak.lokasiPasar.nama }}
                        </div>
                     </div>

                     <q-rating v-model="lapak.rating" :max="5" size="32px" />
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                     <div class="text-subtitle1">
                        📦 {{ lapak.kategoriBarang || '-' }}
                     </div>
                     <div class="text-caption text-grey">
                        📏 {{ lapak.ukuran }} • Blok {{ lapak.nomorBlok || '-' }}
                     </div>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                     <q-btn flat round icon="edit" @click="edit(lapak)" />
                     <q-btn flat color="negative" icon="delete" @click="hapus(lapak)" />
                  </q-card-actions>
               </q-card>
            </div>
            <br><br>
            <q-card v-for="lapak in dataLapak" :key="lapak.id" class="q-mb-md shadow-2">
               <div class="row no-wrap">
                  <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" style="width: 120px; height: 100px;"
                     spinner-color="white" />

                  <div class="col q-pa-sm">
                     <div class="text-weight-bold">{{ lapak.namaPemilik }} <span class="text-grey">#{{ lapak.id
                     }}</span></div>
                     <div class="text-caption text-primary">{{ lapak.jenisLapak }} · {{ lapak.nomorBlok }}</div>
                     <div class="text-caption">{{ lapak.lokasiPasar }}</div>
                     <div class="text-caption">Ukuran: {{ lapak.ukuran }}</div>

                     <q-chip dense outline color="green" v-if="lapak.statusSewa == 'kontrak'">Kontrak</q-chip>
                     <q-chip dense outline color="orange" v-else-if="lapak.statusSewa == 'sementara'">Sementara</q-chip>
                     <q-chip dense outline color="blue" v-else>Milik Pemda</q-chip>
                  </div>

                  <div class="q-pa-sm flex flex-center column">
                     <q-btn dense flat round icon="edit" color="primary" @click="editLapak(lapak)" />
                     <q-btn dense flat round icon="delete" color="red" @click="deleteLapak(lapak)" />
                  </div>
               </div>
            </q-card>
            <hr class="hrpagin">
            <br>
            <div class="text-center">
               <q-btn @click="btn_prev" glossy color="orange" icon="skip_previous" class="paginate_btn" />
               <span class="h_panation">&nbsp; {{ page_first }} - {{ page_last }} &nbsp;</span>
               <q-btn @click="btn_next" glossy color="orange" icon="skip_next" class="paginate_btn" />
            </div>
            <br>
         </q-card-section>
      </q-card>





      <!-- =================================================== MODAL =========================================================== -->


      <!-- ================================================= MODAL TAMBAH ================================================ -->
      <q-dialog v-model="mdl_add" persistent>
         <q-card class="mdl-md">
            <q-card-section class="bg-primary">
               <div class="text-h6 h_modalhead">Simpan Data</div>
            </q-card-section>
            <form @submit.prevent="addData()">
               <q-card-section class="q-pt-none">
                  <br>
                  <div class="row">
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Uraian</span>
                        <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-12 frame_cari">
                        <span class="h_lable ">Keterangan</span>
                        <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                           type="textarea" />
                     </div>
                  </div>
               </q-card-section>
               <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                  <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                  <q-btn label="Batal" color="negative" v-close-popup />
               </q-card-actions>
            </form>
         </q-card>
      </q-dialog>
      <!-- ================================================= MODAL TAMBAH ================================================ -->


      <!-- ================================================= MODAL EDIT ================================================ -->
      <q-dialog v-model="mdl_edit" persistent>
         <q-card class="mdl-md">
            <q-card-section class="bg-orange">
               <div class="text-h6 h_modalhead">Edit Data</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
               <br>
               <span class="h_lable ">Uraian</span>
               <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />

               <span class="h_lable ">Keterangan</span>
               <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn"
                  type="textarea" />

            </q-card-section>

            <q-card-actions class="bg-grey-4 mdl-footer" align="right">

               <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
               <q-btn label="Batal" color="negative" v-close-popup />

            </q-card-actions>
         </q-card>
      </q-dialog>
      <!-- ================================================= MODAL EDIT ================================================ -->

      <!-- ================================================ MODAL HAPUS ================================================ -->
      <q-dialog v-model="mdl_hapus" persistent>
         <q-card class="mdl-sm ">
            <q-card-section class="q-pt-none text-center orageGrad">
               <form @submit.prevent="removeData">
                  <br>
                  <img src="img/alert.png" alt="" width="75"> <br>
                  <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                  <input type="submit" style="position: absolute; left: -9999px" />
                  <br>
                  <br>

                  <q-btn label="Batal" size="sm" color="negative" v-close-popup />
                  &nbsp;
                  <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup />

               </form>
            </q-card-section>
         </q-card>
      </q-dialog>

      <!-- ================================================ MODAL HAPUS ================================================ -->




      <!-- =================================================== MODAL =========================================================== -->




   </div>
</template>


<script>


import FETCHING from '../library/fetching'

export default {
   data() {
      return {

         form: {
            id: '',
            uraian: '',
            keterangan: '',
         },

         // ====================================== CONTOH AUTOCOMPLETE ====================================
         autocomplete_db: '',
         // ====================================== CONTOH AUTOCOMPLETE ====================================




         list_data: [],

         page_first: 1,
         page_last: 0,
         page_limit: 10,
         cari_value: "",
         cek_load_data: true,


         mdl_add: false,
         mdl_edit: false,
         mdl_hapus: false,
         btn_add: false,


         FETCHING: FETCHING,

         dataLapak: [
            {
               id: 'LP-001',
               namaPemilik: 'Ahmad',
               jenisLapak: 'Kios',
               lokasiPasar: {
                  nama: 'Pasar Andoolo',
                  alamat: 'Jl. Poros Andoolo Raya',
                  koordinat: { lat: '-4.123', lng: '122.456' }
               },
               ukuran: '3×3 m²',
               kategoriBarang: 'Sembako',
               nomorBlok: 'Blok A-12',
               foto: 'https://via.placeholder.com/100x100?text=Lapak', // Contoh
               statusSewa: 'kontrak',
               tanggalMulai: '2024-01-01',
               masaBerlaku: '2025-01-01'
            },
            {
               id: 'LP-002',
               namaPemilik: 'Siti',
               jenisLapak: 'Los',
               lokasiPasar: {
                  nama: 'Pasar Tinanggea',
                  alamat: 'Jl. Pasar Utama Tinanggea',
                  koordinat: null
               },
               ukuran: '2×2 m²',
               kategoriBarang: 'Ikan',
               nomorBlok: 'Los B-07',
               foto: '',
               statusSewa: 'pemda',
               tanggalMulai: '2023-05-15',
               masaBerlaku: 'Permanent'
            }
         ]
      }
   },
   methods: {

      statusColor: function (status) {
         if (status === 'kontrak') return 'green';
         if (status === 'pemda') return 'blue';
         return 'orange';
      },


      getView: function () {
         this.$store.commit("shoWLoading");
         fetch(this.$store.state.url.URL_DM_JNS_LAPAK + "view", {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
               data_ke: this.page_first,
               cari_value: this.cari_value
            })
         })
            .then(res => res.json())
            .then(res_data => {
               this.list_data = res_data.data;
               this.page_last = res_data.jml_data;
               this.$store.commit("hideLoading");
               // console.log(res_data);
            });
      },


      addData: function (number) {
         fetch(this.$store.state.url.URL_DM_JNS_LAPAK + "addData", {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
         }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
         });
      },


      editData: function () {
         fetch(this.$store.state.url.URL_DM_JNS_LAPAK + "editData", {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
         }).then(res_data => {
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
            this.getView();
         });
      },

      removeData: function (E) {
         fetch(this.$store.state.url.URL_DM_JNS_LAPAK + "removeData", {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({ id: this.form.id })
         }).then(res_data => {
            this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
            this.getView();
         });

      },

      selectData: function (data) {
         this.form.id = data.id;
         this.form.uraian = data.uraian;
         this.form.keterangan = data.keterangan;
      },

      // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_db_filter: function (val, update) {
         update(() => {
            if (val === '') { }
            else { FETCHING.getContohAtocomplete(val) }
         })
      },

      // ====================================== CONTOH AUTOCOMPLETE ====================================


      indexing: function (index) {
         var idx = ((this.page_first - 1) * this.page_limit) + index
         return idx
      },
      // ====================================== PAGINATE ====================================
      Notify: function (message, positive, icon) {
         this.$q.notify({
            message: message,
            color: positive,
            icon: icon,
            position: 'top',
            timeout: 500,
         })
      },
      btn_prev: function () {
         this.cek_load_data = true;
         if (this.page_first > 1) {
            this.page_first--
         } else {
            this.page_first = 1;
         }
         this.getView();
      },

      btn_next: function () {
         if (this.page_first >= this.page_last) {
            this.page_first == this.page_last
         } else {
            this.page_first++;
         }
         this.getView();
      },

      cari_data: function () {
         this.page_first = 1;
         this.getView();
      },
      // ====================================== PAGINATE ====================================







   },

   mounted() {
      this.getView();
   },
}
</script>