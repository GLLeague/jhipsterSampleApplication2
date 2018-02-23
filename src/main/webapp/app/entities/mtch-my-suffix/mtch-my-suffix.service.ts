import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MtchMySuffix } from './mtch-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MtchMySuffix>;

@Injectable()
export class MtchMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/mtches';

    constructor(private http: HttpClient) { }

    create(mtch: MtchMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mtch);
        return this.http.post<MtchMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mtch: MtchMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(mtch);
        return this.http.put<MtchMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MtchMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MtchMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MtchMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MtchMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MtchMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MtchMySuffix[]>): HttpResponse<MtchMySuffix[]> {
        const jsonResponse: MtchMySuffix[] = res.body;
        const body: MtchMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MtchMySuffix.
     */
    private convertItemFromServer(mtch: MtchMySuffix): MtchMySuffix {
        const copy: MtchMySuffix = Object.assign({}, mtch);
        return copy;
    }

    /**
     * Convert a MtchMySuffix to a JSON which can be sent to the server.
     */
    private convert(mtch: MtchMySuffix): MtchMySuffix {
        const copy: MtchMySuffix = Object.assign({}, mtch);
        return copy;
    }
}
