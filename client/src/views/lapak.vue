<template>
   <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
         <q-card-section class="bg-purple-4 text-white">
            <div class="row">
               <div class="col-12 col-md-6">
                  <div class="text-h6 h_titleHead">Lapak</div>
               </div>
               <div class="col-12 col-md-2"></div>
               <div class="col-12 col-md-4">
                  <div class="row">
                     <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%" />
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
            <div class="row q-col-gutter-md">
               <div class="col-12 col-sm-6 col-md-4" v-for="data in list_data" :key="data.id">
                  <q-card class="my-card" flat bordered>
                     <q-img :src="file_path + data.file">
                        <q-badge v-if="data.status == 0" color="positive" floating label="Pemda" class="q-pa-sm text-uppercase text-weight-bold" />
                        <q-badge v-else color="warning" floating label="Kontrak" class="q-pa-sm text-uppercase text-weight-bold" />
                     </q-img>

                     <q-card-section class="q-pb-sm">
                        <div class="row no-wrap items-start">
                           <div class="col text-h6 text-primary ellipsis q-pr-sm">
                              {{ data.nama }}
                           </div>
                           <div class="col-auto text-grey-8 text-caption row no-wrap items-center">
                              <q-icon name="view_module" size="xs" class="q-mr-xs" />
                              Blok:
                              <span class="text-weight-bold q-ml-xs">{{ data.no_blok }}</span>
                           </div>
                        </div>
                     </q-card-section>

                     <q-card-section class="q-pt-none q-pb-md">
                        <div class="column q-gutter-y-xs">
                           <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                              <b>Nama Pemilik Lapak</b>
                              <span class="text-weight-medium q-ml-sm">: {{ data.nm_pemilik }}</span>
                           </div>

                           <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                              <b>Jenis Lapak</b>
                              <span class="text-weight-medium q-ml-sm">: {{ data.nm_lapak }}</span>
                           </div>

                           <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                              <b>Ukuran Lapak</b>
                              <span class="text-weight-medium q-ml-sm">: {{ data.ukuran_lapak }}</span>
                           </div>

                           <div class="text-subtitle2 text-grey-8 row no-wrap items-center">
                              <b>Jenis Dagangan</b>
                              <span class="text-weight-medium q-ml-sm">: {{ data.nm_dagangan }}</span>
                           </div>
                        </div>
                     </q-card-section>


                     <q-separator />

                     <q-card-actions align="between">
                        <div class="text-caption text-grey"></div>
                        <div>
                           <q-btn flat round icon="visibility" color="primary" size="sm" @click="mdl_lihat = true, selectData(data)">
                              <q-tooltip>Lihat Detail</q-tooltip>
                           </q-btn>
                           <q-btn flat round icon="edit" color="orange" size="sm" @click="mdl_edit = true, selectData(data)">
                              <q-tooltip>Ubah Lapak</q-tooltip>
                           </q-btn>
                           <q-btn flat round icon="delete" color="negative" size="sm" @click="mdl_hapus = true, selectData(data)">
                              <q-tooltip>Hapus Data</q-tooltip>
                           </q-btn>
                        </div>
                     </q-card-actions>
                  </q-card>
               </div>
            </div>
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
                        <span class="h_lable ">Nama Lapak</span>
                        <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Lokasi Lapak</span>
                        <q-select v-model="form.pasar_id" :options="$store.state.list_pasar" option-value="id"
                           option-label="uraian" outlined square :dense="true" class="bg-white margin_btn" emit-value
                           map-options />
                     </div>
                     <div class="col-12 col-md-6 frame_cari frame_cari">
                        <span class="h_lable ">Jenis Lapak</span>
                        <q-select v-model="form.jns_lapak_id" :options="$store.state.list_jns_lapak" option-value="id"
                           option-label="uraian" outlined square :dense="true" class="bg-white margin_btn" emit-value
                           map-options />
                     </div>
                     <div class="col-12 col-md-6 frame_cari frame_cari">
                        <span class="h_lable ">Ukuran Lapak</span>
                        <q-input v-model="form.ukuran_lapak" outlined square :dense="true"
                           class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Jenis Dagangan</span>
                        <q-select v-model="form.jns_dagangan_id" :options="$store.state.list_jns_dagangan"
                           option-value="id" option-label="uraian" outlined square :dense="true"
                           class="bg-white margin_btn" emit-value map-options />
                     </div>
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Nomor Blok / Nomor Los / Nomor Kios</span>
                        <q-input v-model="form.no_blok" outlined square :dense="true" class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Status Sewa / Kepemilikan</span>
                        <select v-model="form.status">
                           <option value="">Pilih</option>
                           <option value="0">Pemda</option>
                           <option value="1">Kontrak</option>
                        </select>
                     </div>
                     <div class="col-12 col-md-6 frame_cari frame_cari">
                        <span class="h_lable ">Tanggal Mulai Sewa</span>
                        <q-input type="date" v-model="form.tgl_mulai" outlined square :dense="true"
                           class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-6 frame_cari frame_cari">
                        <span class="h_lable ">Tanggal Berakhir Sewa</span>
                        <q-input type="date" v-model="form.tgl_akhir" outlined square :dense="true"
                           class="bg-white margin_btn" />
                     </div>
                     <div class="col-12 col-md-12 frame_cari frame_cari">
                        <span class="h_lable ">Foto</span>
                        <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                           <template v-slot:prepend>
                              <q-icon name="attach_file" />
                           </template>
                        </q-file>
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
               <div class="row">
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Nama Lapak</span>
                     <q-input v-model="form.nama" outlined square :dense="true" class="bg-white margin_btn" />
                  </div>
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Lokasi Lapak</span>
                     <q-select v-model="form.pasar_id" :options="$store.state.list_pasar" option-value="id"
                        option-label="uraian" outlined square :dense="true" class="bg-white margin_btn" emit-value
                        map-options />
                  </div>
                  <div class="col-12 col-md-6 frame_cari frame_cari">
                     <span class="h_lable ">Jenis Lapak</span>
                     <q-select v-model="form.jns_lapak_id" :options="$store.state.list_jns_lapak" option-value="id"
                        option-label="uraian" outlined square :dense="true" class="bg-white margin_btn" emit-value
                        map-options />
                  </div>
                  <div class="col-12 col-md-6 frame_cari frame_cari">
                     <span class="h_lable ">Ukuran Lapak</span>
                     <q-input v-model="form.ukuran_lapak" outlined square :dense="true" class="bg-white margin_btn" />
                  </div>
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Jenis Dagangan</span>
                     <q-select v-model="form.jns_dagangan_id" :options="$store.state.list_jns_dagangan"
                        option-value="id" option-label="uraian" outlined square :dense="true"
                        class="bg-white margin_btn" emit-value map-options />
                  </div>
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Nomor Blok / Nomor Los / Nomor Kios</span>
                     <q-input v-model="form.no_blok" outlined square :dense="true" class="bg-white margin_btn" />
                  </div>
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Status Sewa / Kepemilikan</span>
                     <select v-model="form.status">
                        <option value="">Pilih</option>
                        <option value="0">Pemda</option>
                        <option value="1">Kontrak</option>
                     </select>
                  </div>
                  <div class="col-12 col-md-6 frame_cari frame_cari">
                     <span class="h_lable ">Tanggal Mulai Sewa</span>
                     <q-input type="date" v-model="form.tgl_mulai" outlined square :dense="true"
                        class="bg-white margin_btn" />
                  </div>
                  <div class="col-12 col-md-6 frame_cari frame_cari">
                     <span class="h_lable ">Tanggal Berakhir Sewa</span>
                     <q-input type="date" v-model="form.tgl_akhir" outlined square :dense="true"
                        class="bg-white margin_btn" />
                  </div>
                  <div class="col-12 col-md-12 frame_cari frame_cari">
                     <span class="h_lable ">Foto</span>
                     <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                        <template v-slot:prepend>
                           <q-icon name="attach_file" />
                        </template>
                     </q-file>
                  </div>
               </div>

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

      <!-- ================================================ MODAL LIHAT ================================================ -->
      <q-dialog v-model="mdl_lihat" persistent>
         <q-card class="mdl-md">
            <!-- Header -->
            <q-card-section class="bg-purple-3 text-white flex items-center">
               <div class="text-h6">Detil Lapak</div>
            </q-card-section>

            <q-separator />

            <!-- Body -->
            <q-card-section class="q-gutter-md">

               <!-- Lampiran File -->
               <div>
                  <div class="text-subtitle1 text-bold q-mb-sm">Foto Lapak</div>
                  <div v-if="form.file">
                     <q-img :src="file_path + form.file" spinner-color="primary"
                        style="max-height: 400px; cursor: pointer; border: 1px solid #ddd; border-radius: 6px;"
                        @click="downloadFile(form.file_name)" />
                  </div>
                  <div v-else>
                     <span class="text-grey">Tidak ada file</span>
                  </div>
               </div>

               <div>
                  <div class="text-subtitle1 text-bold q-mb-sm">Informasi Lapak</div>
                  <q-list dense bordered separator class="rounded-borders">
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Nama Lapak</b></q-item-section>
                        <q-item-section>{{ form.nama }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Jenis Lapak</b></q-item-section>
                        <q-item-section>{{ form.nm_lapak }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Lokasi Pasar</b></q-item-section>
                        <q-item-section>{{ form.nm_pasar }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Ukuran / Luas Lapak</b></q-item-section>
                        <q-item-section>{{ form.ukuran_lapak }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Barang Dagangan</b></q-item-section>
                        <q-item-section>{{ form.nm_dagangan }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Status Kepemilikan</b></q-item-section>
                        <q-item-section>{{ form.status }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Tanggal Mulai Sewa</b></q-item-section>
                        <q-item-section>{{ UMUM.tglConvert(form.tgl_mulai) }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Masa Berlaku</b></q-item-section>
                        <q-item-section>{{ UMUM.tglConvert(form.tgl_akhir) }}</q-item-section>
                     </q-item>
                  </q-list>
               </div>

               <div>
                  <div class="text-subtitle1 text-bold q-mb-sm">Biodata Pemilik Lapak</div>
                  <q-list dense bordered separator class="rounded-borders">
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Nama Lengkap</b></q-item-section>
                        <q-item-section>{{ form.nm_pemilik }}</q-item-section>
                     </q-item>
                     <q-item v-if="form.uraian_bidang_sub_csr">
                        <q-item-section class="col-3 text-weight-medium"><b>NIK</b></q-item-section>
                        <q-item-section>{{ form.nik }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Alamat</b></q-item-section>
                        <q-item-section>{{ form.alamat }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Nomor HP</b></q-item-section>
                        <q-item-section>{{ form.hp }}</q-item-section>
                     </q-item>
                     <q-item>
                        <q-item-section class="col-3 text-weight-medium"><b>Email</b></q-item-section>
                        <q-item-section>{{ form.email }}</q-item-section>
                     </q-item>
                  </q-list>
               </div>

            </q-card-section>

            <!-- Footer -->
            <q-separator />
            <q-card-actions class="bg-grey-3" align="right">
               <q-btn label="Tutup" color="negative" v-close-popup />
            </q-card-actions>
         </q-card>
      </q-dialog>
      <!-- ================================================ MODAL LIHAT ================================================ -->




      <!-- =================================================== MODAL =========================================================== -->




   </div>
</template>


<script>


import FETCHING from '../library/fetching'
import DATA_MASTER from '../library/dataMaster'
import UMUM from '../library/umum'

export default {
   data() {
      return {

         form: {
            id: '',
            nama: '',
            pasar_id: '',
            jns_lapak_id: '',
            ukuran_lapak: '',
            jns_dagangan_id: '',
            no_blok: '',
            status: '',
            tgl_mulai: '',
            tgl_akhir: '',
            file: null,

            nm_pemilik: '',
            nik: '',
            alamat: '',
            email: '',
            hp: '',

            nm_dagangan: '',
            nm_lapak: '',
            nm_pasar: '',
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
         file_path: this.$store.state.url.URL_APP + "uploads/",


         mdl_add: false,
         mdl_edit: false,
         mdl_hapus: false,
         mdl_lihat: false,
         btn_add: false,


         FETCHING: FETCHING,
         DATA_MASTER: DATA_MASTER,
         UMUM: UMUM,
      }
   },
   methods: {

      getView: function () {
         this.$store.commit("shoWLoading");
         fetch(this.$store.state.url.URL_LAPAK + "view", {
            method: "POST",
            headers: {
               "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
               data_ke: this.page_first,
               page_limit: this.page_limit,
               cari_value: this.cari_value,
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


      addData: function () {
         var formData = new FormData();
         formData.append('data', JSON.stringify(this.form))
         formData.append('file', this.form.file)

         fetch(this.$store.state.url.URL_LAPAK + "addData", {
            method: "POST",
            headers: {
               // "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: formData
         }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
         });
      },


      editData: function () {
         var formData = new FormData();
         formData.append('data', JSON.stringify(this.form))
         formData.append('file', this.form.file)

         fetch(this.$store.state.url.URL_LAPAK + "editData", {
            method: "POST",
            headers: {
               // "content-type": "application/json",
               authorization: "kikensbatara " + localStorage.token
            },
            body: formData
         }).then(res_data => {
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
            this.getView();
         });
      },

      removeData: function (E) {
         fetch(this.$store.state.url.URL_LAPAK + "removeData", {
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
         this.form.nama = data.nama;
         this.form.ukuran_lapak = data.ukuran_lapak;
         this.form.no_blok = data.no_blok;
         this.form.status = data.status;
         this.form.tgl_mulai = data.tgl_mulai;
         this.form.tgl_akhir = data.tgl_akhir;
         this.form.file = data.file;
         this.form.nm_pemilik = data.nm_pemilik;
         this.form.nik = data.nik;
         this.form.alamat = data.alamat;
         this.form.email = data.email;
         this.form.hp = data.hp;
         this.form.nm_dagangan = data.nm_dagangan;
         this.form.nm_lapak = data.nm_lapak;
         this.form.nm_pasar = data.nm_pasar;
      },

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
      DATA_MASTER.getPasar();
      DATA_MASTER.getJnsLapak();
      DATA_MASTER.getJnsDagangan();
   },
}
</script>