import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AbcProductAddEditDataComponent } from './abcproductaddeditdata.component';

describe('AbcProductAddEditDataComponent', () => {
  let component: AbcProductAddEditDataComponent;
  let fixture: ComponentFixture<AbcProductAddEditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule,HttpClientTestingModule,FormsModule],
      declarations: [ AbcProductAddEditDataComponent ],
      providers: [
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbcProductAddEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
