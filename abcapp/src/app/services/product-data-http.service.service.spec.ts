import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { ProductDataHttpService }  from './product-data-http.service.service';


let httpClientSpy: { get: jasmine.Spy };
let productDataHttpService: ProductDataHttpService;
let apibaseurl = "http://localhost:58988/api/Products";


describe('ProductDataHttpService', () => {
    let service: ProductDataHttpService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductDataHttpService]
        }).compileComponents();
        service = TestBed.inject(ProductDataHttpService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('getProductbyName test and should return searched product data', () => {
        const dummyProduct: IProduct[] = [{ productId: '501', productName: 'A',productDescription: 'Test',productCategory: 'Test',productStockLevel:"45",productPrice:"67" }];;
        service.getProductDataByProductName('iphone').subscribe(posts => {
            expect(posts.length).toBe(1);
            expect(posts[0].productId).toEqual(dummyProduct[0].productId);
        });
        const request = httpMock.expectOne(apibaseurl+"/GetProductDetailsByProductName?searchParam=iphone");
        expect(request.request.method).toBe('GET');
        request.flush(dummyProduct);
        });

        it('getProductData test and should return product data', () => {
            const dummyProduct: IProduct[] = [{ productId: '1', productName: 'A',productDescription: 'Test',productCategory: 'Test',productStockLevel:"45",productPrice:"67" }];;
            service.getProductData().subscribe(posts => {
                expect(posts.length).toBe(1);
                expect(posts).toEqual(dummyProduct);
            });
            const request = httpMock.expectOne(apibaseurl+"/GetProductsDetails");
            expect(request.request.method).toBe('GET');
            request.flush(dummyProduct);
            });

            
        it('InsertProductsDetails test and should return create status code', () => {
            const headersData = { headers: new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json' })};
            const insertProduct: IProduct = { productId: '1', productName: 'A',productDescription: 'Test',productCategory: 'Test',productStockLevel:"45",productPrice:"67" };
            service.insertProductData(insertProduct).subscribe(posts => {
                expect(posts).toEqual(insertProduct);
            });
            const req = httpMock.expectOne(apibaseurl +"/InsertProductsDetails");
            expect(req.request.method).toEqual('POST');
            req.flush(insertProduct, { status: 201, statusText: 'Created' });
            });

            it('UpdateProductsDetails test and should return ok status code', () => {
                const headersData = { headers: new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json' })};
                const updateProduct: IProduct = { productId: '500', productName: 'A',productDescription: 'Test',productCategory: 'Test',productStockLevel:"45",productPrice:"67" };
                service.updateProductData(updateProduct).subscribe(posts => {
                    expect(posts).toEqual(updateProduct);
                });
                const req = httpMock.expectOne(apibaseurl +"/UpdateProductsDetails");
                expect(req.request.method).toEqual('PUT');
                req.flush(updateProduct, { status: 200, statusText: 'Ok' });
                httpMock.verify();
                });
    

          
});

