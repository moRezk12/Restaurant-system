import { Component , ViewChild , HostListener, ElementRef } from '@angular/core';


@Component({
  selector: 'app-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.css']
})
export class PowersComponent {

     constructor(private eRef: ElementRef) {}

      @ViewChild('powersBox', { static: false }) powersBox!: ElementRef;



      dropdownOpenPowers = false;

      @HostListener('document:click', ['$event.target'])
      handleClickOutside(target: HTMLElement) {
        if (
          this.dropdownOpenPowers &&
          this.powersBox &&
          !this.powersBox.nativeElement.contains(target)
        ) {
          this.dropdownOpenPowers = false;
        }
      }



        // Powers
        allOptionsPowers = ['Users', 'Reports', 'Objections', 'Rating', 'Questions'];
        selectedPowers: string[] = [];

        selectAll(){
          this.selectedPowers = this.allOptionsPowers.slice();
        }

        deleteAll(){
          this.selectedPowers = [];
        }

        toggleDropdownPowers() {
          this.dropdownOpenPowers = !this.dropdownOpenPowers;
        }
        selectPower(option: string) {
          if (!this.selectedPowers.includes(option)) {
            this.selectedPowers.push(option);
          }
        }
        removePower(option: string) {
          this.selectedPowers = this.selectedPowers.filter(o => o !== option);
        }
        isPowerSelected(option: string): boolean {
          return this.selectedPowers.includes(option);
        }


        showPopup : boolean = false;

    openPopup() {
      this.showPopup = true;
      this.selectedPowers = [];
    }

    closePopup() {
      this.showPopup = false;
      this.selectedPowers = [];
    }

}
