import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { KENDO_CHARTS } from '@progress/kendo-angular-charts';
import {
  DataBindingDirective,
  ExcelModule,
  GridModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  RowArgs,
} from '@progress/kendo-angular-grid';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { process } from '@progress/kendo-data-query';
import {
  SVGIcon,
  fileExcelIcon,
  filePdfIcon,
  moreVerticalIcon,
} from '@progress/kendo-svg-icons';
import { employees } from './employees';
import { images } from './image';
import { RouterLink } from '@angular/router';
import {
  DropDownsModule,
  KENDO_DROPDOWNLIST,
} from '@progress/kendo-angular-dropdowns';
import { MenuModule } from '@progress/kendo-angular-menu';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconModule } from '@progress/kendo-angular-icons';
import { FormsModule, NgModel } from '@angular/forms';
import { ExcelExportComponent } from '@progress/kendo-angular-excel-export';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    GridModule,
    RouterLink,
    MenuModule,
    DropDownsModule,
    CommonModule,
    KENDO_DROPDOWNLIST,
    KENDO_GRID,
    KENDO_CHARTS,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT,
    ButtonsModule,
    IconModule,
    CommonModule,
    NgIf,
    FormsModule,
    ExcelModule,
  ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  
})
export class GridComponent implements OnInit {
  public moreVerticalIcon: SVGIcon = moreVerticalIcon;
  @ViewChild(GridComponent) grid!: GridComponent;
  
  activeLink: string = '';

  setActive(link: string) {
    this.activeLink = link;
    localStorage.setItem('activeLink', link);
  }
 
  
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;

  public gridData: any[] = employees;
  public gridView: any[] = [];

  public mySelection: string[] = [];
  public pdfSVG: SVGIcon = filePdfIcon;
  public excelSVG: SVGIcon = fileExcelIcon;
  public editedRowIndex: number | null = null;
  public editedItem: any;
  public searchKeyword: string = '';
  public isDarkMode = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  public ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark';
    document.body.classList.toggle('dark-mode', this.isDarkMode);

    const localData = localStorage.getItem('gridData');
    this.gridData = localData ? JSON.parse(localData) : [...employees];

    if (this.gridData.length === 0) {
      const newPerson = {
        id: this.generateUniqueId(),
        recordId: '',
        lastName: '',
        firstName: '',
        primaryEmailAddress: '',
        primaryPhoneType: '',
        lmpLeadId: '',
        appointmentType: '',
        bookingAgency: '',
      };
      this.gridData.unshift(newPerson);
      this.gridData = [...this.gridView];
      localStorage.setItem('gridData', JSON.stringify(this.gridData));
    }

    this.gridView = [...this.gridData];

    const storedLink = localStorage.getItem('activeLink');
    if (storedLink) {
      this.activeLink = storedLink;
    }
    
  }
  public onRowClick(event: any): void {
    if (
      this.editedRowIndex !== null &&
      this.editedRowIndex !== event.rowIndex
    ) {
      this.onSaveClick();
    }

    this.onEditClick(event.dataItem, event.rowIndex);
  }

  @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const targetElement = event.target as HTMLElement;


  const clickedInsideGrid = targetElement.closest('kendo-grid');
  if (this.editedRowIndex !== null && !clickedInsideGrid) {
    this.onSaveClick();
  }
}


  public onEditClick(item: any, rowIndex: number): void {
    this.editedRowIndex = rowIndex;
    this.editedItem = { ...item };
    localStorage.setItem('gridData', JSON.stringify(this.gridView));
  }

  public onCreateClick(): void {
    
    const newItem = {
      id: this.generateUniqueId(),
      recordId: '',
      lastName: '',
      firstName: '',
      primaryEmailAddress: '',
      primaryPhoneType: '',
      lmpLeadId: '',
      appointmentType: '',
      bookingAgency: '',
    };
  
    this.gridView = [newItem, ...this.gridView];
 
    this.editedRowIndex = 0;
    this.editedItem = { ...newItem };
 
  }
  

  public onSaveClick(): void {
    if (this.editedRowIndex !== null) {
      const updatedGrid = [...this.gridView];
      updatedGrid[this.editedRowIndex] = this.editedItem;
      this.gridView = updatedGrid;
      localStorage.setItem('gridData', JSON.stringify(this.gridView));

      
      this.cancelEdit();
    }
  }
  

  public onCancelClick(): void {
    this.cancelEdit();
  }

  public cancelEdit(): void {
    this.editedItem = null;
    this.editedRowIndex = null;
  }
  deleteRow(id: number): void {
    this.gridView = this.gridView.filter((item) => item.recordId !== id);
    localStorage.setItem('gridData', JSON.stringify(this.gridView));
  }
  private generateUniqueId(): number {
    return Date.now();
  }

  onFilter(value: string): void {
    const keyword = value.toLowerCase().trim();

    const latestData = JSON.parse(localStorage.getItem('gridData') || '[]');

    this.gridView = latestData.filter(
      (item: { [s: string]: unknown } | ArrayLike<unknown>) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(keyword)
        )
    );
  }
  public areaList: Array<string> = [
    "Boston",
    "Chicago",
    "Houston",
    "Los Angeles",
    "Miami",
    "New York",
    "Philadelphia",
    "San Francisco",
    "Seattle",
  ];
  
} 
                                              