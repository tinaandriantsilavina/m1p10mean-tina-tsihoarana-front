import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadfileService } from './../../services/uploadfile.service';
import { ImageUploadComponent } from './../../components/image-upload/image-upload.component';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.scss']
})
export class DepotVoitureComponent implements OnInit {
  submitted = false;
  formulaire: FormGroup;
  message = "";
  testdata: any;
  maxsize =1;
  modalActive:NgbActiveModal

  spinnerName: string = 'action';
  spinnerType = 'ball-clip-rotate-pulse';
  spinnerSize = 'medium';
  spinnerBackground = 'rgba(51,51,51,0.1)';

  @ViewChild(ImageUploadComponent, { static: false }) image: ImageUploadComponent;
  @ViewChild('modalcontent', { static: true }) modalcontent: TemplateRef<any>;
  ngAfterViewInit(): void {
  }
  allRole =[{
    slug:"huhu",
    id:1,

  }]

  spinner_name ="";
  spinner_detail_tickets: any;
  spinner_type: any;
  spinner_size: any;
  spinner_background: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public uploadService: UploadfileService,
    private spinner: NgxSpinnerService,
    public modal: NgbModal,
    private toastr: ToastrService,
  ) {
    this.spinner_name = "spinner_list";
    this.spinner_type = "ball-circus";
    this.spinner_size = "medium";
    this.spinner_background = "rgba(51,51,51,0.3)";
  }

  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm() {
    this.formulaire = this.formBuilder.group(
      {
        marque_voiture: ["Mercedes-benz", [Validators.required]],
        model_voiture: ["Sprinter 312", [Validators.required]],
        date_deposition: ["2022-01-10", [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
    // this.toastr.success("huhu")
      // this.spinner.show(this.spinner_name);
  }

  async valider() {
    this.toastr.success("huhu","hahah")
    this.modalActive = this.modal.open(this.modalcontent, { size: 'sm', backdrop: 'static', centered: true  });
    if (this.formulaire.valid && this.image.image != null) {
      console.log(this.image.image)
      if (this.image.image.size > this.maxsize) {
        this.message = " "
        let image = await this.uploadService.encodeFileToBase64(this.image.image);
        let form = {}
        form = this.formulaire.getRawValue()
        form['image'] = image
        console.log(form)
        // this.toastr.warning("Demande du depot voiture effectuer avec success");
      }else{
        this.message = "la taille de l'image ne doit pas dépasser"+this.maxsize/1000+  " ko";
        // this.toastr.warning("la taille de l'image ne doit pas dépasser"+this.maxsize/1000+  " ko");
      }
    } else {
      this.message = "Veuillez remplir le formulaire correctement";
      // this.toastr.warning('Veuillez y mettre une réponse intermédiaire');
    }
  }


}
