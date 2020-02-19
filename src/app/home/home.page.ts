import { Component } from '@angular/core';

import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
 
import { ImagePicker } from '@ionic-native/image-picker/ngx';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  imageResponse: any;
  options: any;
 
  constructor(
    private imagePicker: ImagePicker,
    private http: HttpClient,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private loadingController: LoadingController,
    ) { }
 
  getImages() {
    this.options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 5,
 
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      //width: 200,
      height: 1000,
 
      // quality of resized image, defaults to 100
      quality: 100,
 
      // output type, defaults to FILE_URIs.
      // available options are 
      // window.imagePicker.OutputType.FILE_URI (0) or 
      // window.imagePicker.OutputType.BASE64_STRING (1)
      outputType: 1
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
    }, (err) => {
      alert(err);
    });
  }



  async publierImages(){
    const formData = new FormData();
      for (var i = 0; i < this.imageResponse.length; i++) {
        console.log(this.imageResponse[i]);
      }

      let tableauImages = [];

      for (var i = 0; i < this.imageResponse.length; i++) {
        tableauImages[i]=this.imageResponse[i];
      }
      let nomImage : string = 'image';
      formData.append(nomImage, JSON.stringify(tableauImages));
      this.uploadImageData(formData);
      console.log(tableauImages);
  }



  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }


  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
        message: 'Uploading image...',
    });
    await loading.present();
 
    this.http.post("http://dawal.grafidev.com/testphp/upload.php", formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe(res => {
            if (res['success']) {
                this.presentToast('File upload complete.')
            } else {
                this.presentToast('File upload failed.')
            }
        });
}
 
}
 