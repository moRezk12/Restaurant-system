import { Component } from '@angular/core';
import { Country, City } from 'country-state-city';

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent {

  countries = Country.getAllCountries(); // يجلب جميع الدول
  cities : any;

  selectedCountryCode: string = '';
  selectedCity: string = '';

  onCountryChange(code: string) {
    this.cities = City.getCitiesOfCountry(code);
      console.log('Selected country code:', code);
  console.log('Cities:', this.cities);
  }

}
