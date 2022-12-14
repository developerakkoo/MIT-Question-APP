import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-relative-select-page',
  templateUrl: './relative-select-page.page.html',
  styleUrls: ['./relative-select-page.page.scss'],
})
export class RelativeSelectPagePage implements OnInit {
  relativeFilter: any = { value: ""};
  relatives = [
    {value: "Mother", type: "r"},
    {value: "Father", type: "r"},
    {value: "Grandfather (Father Of Father)", type: "r"},
    {value: "Grandmother (Mother Of Father)", type: "r"},
    {value: "Grandfather (Father Of Mother)", type: "r"},
   { value: "Grandmother (Mother Of Mother)", type: "r"},
    {value: "Brother", type: "r"},
    {value: "Sister", type: "r"},
    {value: "Elder Brother", type: "r"},
    {value: "Elder Sister", type: "r"},
    {value: "Younger Brother", type: "r"},
   {value:  "Younger Sister", type: "r"},
   {value:  "Son", type: "r"},
    {value: "Daughter", type: "r"},
    {value: "Uncle", type: "r"},
   {value:  "Aunty", type: "r"},
   {value:  "Son’s son Grandson", type: "r"},
    {value: "Son’s Daughter Granddaughter", type: "r"},
    {value: "Daughter’s son/Grandson", type: "r"},
    {value: "Daughter’s Daughter/Granddaughter", type: "r"},
    {value: "Nephew", type: "r"},
   {value:  "Niece", type: "r"},
    {value: "Maternal Uncle", type: "r"},
    {value: "Maternal Aunt", type: "r"},
    {value: "Son in Law", type: "r"},
    {value: "Daughter in Law", type: "r"},
    {value: "Husband", type: "r"},
    {value: "Wife", type: "r"},
    {value: "Father in law", type: "r"},
    {value: "Mother in law", type: "r"},
    {value: "Brother in law", type: "r"},
    {value: "Sister in law", type: "r"},
    {value: "Fiance", type: "r"},
    {value: "Brother’s wife", type: "r"},
    {value: "Sister’s husband", type: "r"},
    {value: "Wife’s Sister’s husband", type: "r"},
    {value: "Husband’s Sister’s Husband", type: "r"},
    {value: "Husband’s Elder Brother’s Wife", type: "r"},
    {value: "Father’s Brother’s Son ", type: "r"},
    {value: "Fathers Brother’s Daughter ", type: "r"},
    {value: "Father’s Sister’s Son", type: "r"},
    {value: "Father’s Sister’s Daughter ", type: "r"},
    {value: "Mother’s Brother’s Son ", type: "r"},
   { value: "Mother’s Brother’s Daughter", type: "r"},
    {value: "Mother’s Sister’s Son ", type: "r"},
    {value: "Mother’s Sister’s Daughter", type: "r"},
   {value:  "Spouse", type: "r"},
    {value: "Step Brother", type: "r"},
    {value: "Step Sister", type: "r"},
    {value: "Step Father", type: "r"},
    {value: "Step Mother", type: "r"},
    {value: "Step Son", type: "r"},
    {value: "Step Daughter", type: "r"},
    {value: "Adopted Son", type: "r"},
   {value:  "Adopted Daughter", type: "r"},
    {value: "Relative", type: "f"},
    {value: "Own", type: "f"},
   { value: "Pupil", type: "f"},
    {value: "Disciple", type: "f"},
    {value: "Preceptor", type: "f"},
    {value: "Guest", type: "f"},
   {value:  "Teacher", type: "f"},
    {value: "Tenant",type: "f"},
    {value: "Customer",type: "f"},
    {value: "Landlord",type: "f"},
   { value: "Friend",type: "f"},
    {value: "Lover",type: "f"},
   { value: "Boyfriend",type: "f"},
    {value: "Girlfriend",type: "f"},
    {value: "Client",type: "f"},
    {value: "Patient",type: "f"},
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
