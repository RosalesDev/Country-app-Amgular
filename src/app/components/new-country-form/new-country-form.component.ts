import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/Country';
import { CountriesService } from 'src/app/services/countries.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-new-country-form',
  templateUrl: './new-country-form.component.html',
  styleUrls: ['./new-country-form.component.css']
})
export class NewCountryFormComponent {

  formG!: FormGroup;
  flagURL: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private favoritesService: FavoritesService
    ){
    this.createFrom();
    this.flagURL = this.formG.get('flagUrl')?.value;
    console.log(this.formG.valid);
  }

  isInvalid(inputName: string){
    return this.formG.get(inputName)?.invalid && this.formG.get(inputName)?.touched;
  }

  onChangeFlagUrl(url: string){
    console.log(url);
    this.flagURL = url;
  }
  
  createFrom(){
    this.formG = this.formBuilder.group({
      flagUrl: ['https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg', Validators.required],
      countryName: ['',[Validators.required, Validators.minLength(4)]],
      englishName: ['',[Validators.required, Validators.minLength(4)]],
      capital: ['',[Validators.required, Validators.minLength(4)]],
      currencies: ['',Validators.required],
      mapsUrl: ['',Validators.required],
      population: ['',Validators.required],
      continent: ['',Validators.required],
    });
  }
  save(){
    console.log(this.formG);
    if(this.formG.invalid){
      Object.values(this.formG.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      let newCountry = new Country();
      newCountry.flagUrl = this.formG.get('flagUrl')?.value;
      newCountry.flagAlt = 'Custom country flag';
      newCountry.name = this.formG.get('countryName')?.value;
      newCountry.englishName = this.formG.get('englishName')?.value;
      newCountry.capital = this.formG.get('capital')?.value;
      newCountry.currencies = [{curr: {name:this.formG.get('currencies')?.value}}];
      newCountry.mapsUrl = this.formG.get('mapsUrl')?.value;
      newCountry.population = this.formG.get('population')?.value;
      newCountry.continent = this.formG.get('continent')?.value;
      newCountry.isCustomCountry = true;

      this.countriesService.addCustomCountry(newCountry);
      this.favoritesService.addFavoriteCountry(newCountry);
    }
  }

}
