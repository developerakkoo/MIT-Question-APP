import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-relative-select-page',
  templateUrl: './relative-select-page.page.html',
  styleUrls: ['./relative-select-page.page.scss'],
})
export class RelativeSelectPagePage implements OnInit {

  relatives = [
    "Mother",
    "Father",
    "Grandfather (Father Of Father)",
    "Grandmother (Mother Of Father)",
    "Grandfather (Father Of Mother)",
    "Grandmother (Mother Of Mother)",
    "Brother",
    "Sister",
    "Elder Brother",
    "Elder Sister",
    "Younger Brother",
    "Younger Sister",
    "Son",
    "Daughter",
    "Uncle",
    "Aunty",
    "Son’s son Grandson",
    "Son’s Daughter Granddaughter",
    "Daughter’s son/Grandson",
    "Daughter’s Daughter/Granddaughter",
    "Nephew",
    "Niece",
    "Maternal Uncle",
    "Maternal Aunt",
    "Son in Law",
    "Daughter in Law",
    "Husband",
    "Wife",
    "Father in law",
    "Mother in law",
    "Brother in law",
    "Sister in law",
    "Fiance",
    "Brother’s wife",
    "Sister’s husband",
    "Wife’s Sister’s husband",
    "Husband’s Sister’s Husband",
    "Husband’s Elder Brother’s Wife",
    "Father’s Brother’s Son ",
    "Fathers Brother’s Daughter ",
    "Father’s Sister’s Son",
    "Father’s Sister’s Daughter ",
    "Mother’s Brother’s Son ",
    "Mother’s Brother’s Daughter",
    "Mother’s Sister’s Son ",
    "Mother’s Sister’s Daughter",
    "Spouse",
    "Step Brother",
    "Step Sister",
    "Step Father",
    "Step Mother",
    "Step Son",
    "Step Daughter",
    "Adopted Son",
    "Adopted Daughter",
    "Relative",
    "Own",
    "Pupil",
    "Disciple",
    "Preceptor",
    "Guest",
    "Teacher",
    "Tenant",
    "Customer",
    "Landlord",
    "Friend",
    "Lover",
    "Boyfriend",
    "Girlfriend",
    "Client",
    "Patient",
  ]
  @Input() tag:string;
  constructor(private modalController: ModalController,
              private route: ActivatedRoute) {
         
                
              }

  ngOnInit() {
  }
  onDismissByValue(value){
    this.modalController.dismiss(value);
  }

  onDismiss(){
    this.modalController.dismiss();
  }

}
