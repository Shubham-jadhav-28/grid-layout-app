import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { KENDO_CHARTS } from "@progress/kendo-angular-charts";
import {
  DataBindingDirective,
  GridModule,
  KENDO_GRID,
  KENDO_GRID_EXCEL_EXPORT,
  KENDO_GRID_PDF_EXPORT,
  RowArgs,
} from "@progress/kendo-angular-grid";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { process } from "@progress/kendo-data-query";
import { SVGIcon, fileExcelIcon, filePdfIcon, moreVerticalIcon } from "@progress/kendo-svg-icons";
import { employees } from "./employs";
import { images } from "./image";
import { RouterLink } from "@angular/router";
import { DropDownsModule, KENDO_DROPDOWNLIST } from "@progress/kendo-angular-dropdowns";
import { MenuModule } from "@progress/kendo-angular-menu";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IconModule } from "@progress/kendo-angular-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";



@Component({
  selector: 'app-grid',
  standalone: true,   
  imports: [GridModule, RouterLink, MenuModule, DropDownsModule, CommonModule,KENDO_DROPDOWNLIST,
    KENDO_GRID,
    KENDO_CHARTS,
    KENDO_INPUTS,
    KENDO_GRID_PDF_EXPORT,
    KENDO_GRID_EXCEL_EXPORT, ButtonsModule,IconModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  
})
export class GridComponent implements  OnInit  {
  public moreVerticalIcon: SVGIcon = moreVerticalIcon;
  @ViewChild(GridComponent) grid!: GridComponent;
  activeLink: string = '';
  // editedItem is already declared below, removing this duplicate declaration.

// ngOnInit() {
  

// }

setActive(link: string) {
  this.activeLink = link;
  localStorage.setItem('activeLink', link); 
}

public editedRowIndex: number | undefined;
public editedItem: any;
public formGroup!: FormGroup;

constructor(private fb: FormBuilder) {}
public editHandler({ sender, rowIndex, dataItem }: { sender: any; rowIndex: number; dataItem: any }): void {
  this.closeEditor(sender);

  this.formGroup = this.fb.group({
    id: [dataItem.id],
    name: [dataItem.name, Validators.required],
    email: [dataItem.email, [Validators.required, Validators.email]]
  });

  this.editedRowIndex = rowIndex;
  sender.editRow(rowIndex, this.formGroup);
}

public cancelHandler({ sender, rowIndex }: any): void {
  this.closeEditor(sender);
}

public saveHandler({ sender, rowIndex, formGroup, isNew }: any): void {
  const updatedItem = formGroup.value;

  if (isNew) {
    this.gridData.push(updatedItem);
  } else {
    this.gridData[rowIndex] = updatedItem;
  }

  this.closeEditor(sender);
}

public removeHandler({ dataItem }: any): void {
  const index = this.gridData.findIndex(item => item.id === dataItem.id);
  if (index !== -1) {
    this.gridData.splice(index, 1);
  }
}

private closeEditor(grid: GridComponent): void {
  grid.closeRow(this.editedRowIndex!);
  this.editedRowIndex = undefined;
  this.formGroup = new FormGroup({});
}
  closeRow(arg0: number) {
    throw new Error("Method not implemented.");
  }

    actions = [
      { text: 'Add Agent', icon: 'plus' },
      { text: 'Manage Agents', icon: 'list' }
    ];
    @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective ;
  
    public gridData: any[] = employees;
    public gridView : any[]=[];
    
  
    public mySelection: string[] = [];
    public pdfSVG: SVGIcon = filePdfIcon;
    public excelSVG: SVGIcon = fileExcelIcon;
  
    public ngOnInit(): void {
      this.gridView = this.gridData;
      const localData = localStorage.getItem('gridData');
      this.gridView = localData ? JSON.parse(localData) : [];
      const storedLink = localStorage.getItem('activeLink');
      if (storedLink) {
        this.activeLink = storedLink;
      }
    }

   
    
    public onFilter(value: Event): void {
      const inputValue = value;
  
      this.gridView = process(this.gridData, {
        filter: {
          logic: "or",
          filters: [
            {
              field: "full_name",
              operator: "contains",
              value: inputValue,
            },
            {
              field: "job_title",
              operator: "contains",
              value: inputValue,
            },
            {
              field: "budget",
              operator: "contains",
              value: inputValue,
            },
            {
              field: "phone",
              operator: "contains",
              value: inputValue,
            },
            {
              field: "address",
              operator: "contains",
              value: inputValue,
            },
          ],
        },
      }).data;
  
      if (this.dataBinding) {
        this.dataBinding.skip = 0;
      }
    }
  
    public photoURL(dataItem: { img_id: string; gender: string }): string {
      const code: string = dataItem.img_id + dataItem.gender;
      const image: { [Key: string]: string } = images;
  
      return image[code];
    }
  
    public flagURL(dataItem: { country: string }): string {
      const code: string = dataItem.country;
      const image: { [Key: string]: string } = images;
  
      return image[code];
    }
  }
  

