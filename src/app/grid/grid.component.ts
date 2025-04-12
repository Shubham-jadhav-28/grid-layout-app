import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridDataResult, GridModule, PageChangeEvent } from '@progress/kendo-angular-grid';
import { MenuModule } from '@progress/kendo-angular-menu';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-grid',
  standalone: true,  
  imports: [GridModule, RouterLink, MenuModule, DropDownsModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  
  activeLink: string = '';

ngOnInit() {
  
  const storedLink = localStorage.getItem('activeLink');
  if (storedLink) {
    this.activeLink = storedLink;
  }
}

setActive(link: string) {
  this.activeLink = link;
  localStorage.setItem('activeLink', link); 
}

    
  
    actions = [
      { text: 'Add Agent', icon: 'plus' },
      { text: 'Manage Agents', icon: 'list' }
    ];
    public gridData: any[] = [
      
      {
        
        recordId: 111994,
        lastName: 'TEST',
        firstName: 'APRILLELEVEN',
        email: 'TULSI.KULKARNI@WAIIN.COM',
        phoneType: 'Home (565) 656-5666 - 6',
        lmpLeadId: '',
        appointmentType: '',
        bookingAgency: '2222000',
      },
      {
        recordId: 109907,
        lastName: 'Nat Storage',
        firstName: 'Marie',
        email: 'm@e.com',
        phoneType: 'Home (630) 555-2024',
        lmpLeadId: '',
        appointmentType: '',
        bookingAgency: '2007000',
      },
      {
        recordId: 111962,
        lastName: 'Pathak 09-04',
        firstName: 'Pooja',
        email: 'p.u@gmail.com',
        phoneType: 'Home (313) 233-3233',
        lmpLeadId: 'MS-Pro',
        appointmentType: '',
        bookingAgency: '2222000',
      },
      {
        recordId: 111993,
        lastName: 'E-Sign III',
        firstName: 'Test',
        email: 'joseph.long@sinra.com',
        phoneType: 'Mobile/Cell (630) 561-1303',
        lmpLeadId: '',
        appointmentType: '',
        bookingAgency: '2222000',
      },
      {
        recordId: 111992,
        lastName: 'E-Sign II',
        firstName: 'Test',
        email: 'joseph.long@sinra.com',
        phoneType: 'Mobile/Cell (630) 561-1303',
        lmpLeadId: '',
        appointmentType: '',
        bookingAgency: '2222000',
      },
    ];
  
    public gridView: GridDataResult | undefined;
    public pageSize = 5;
    public skip = 0;
  
    constructor() {
      this.loadItems();
    }
  
    public pageChange(event: PageChangeEvent): void {
      this.skip = event.skip;
      this.loadItems();
    }
  
    private loadItems(): void {
      this.gridView = {
        data: this.gridData.slice(this.skip, this.skip + this.pageSize),
        total: this.gridData.length,
      };
    }
  }
  

