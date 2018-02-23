import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Mtch } from './mtch.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Mtch>;

@Injectable()
export class MtchService {

    private resourceUrl =  SERVER_API_URL + 'api/mtches';

    constructor(private http: HttpClient) { }

    create(mtch: Mtch): Observable<EntityResponseType> {
        const copy = this.convert(mtch);
        return this.http.post<Mtch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(mtch: Mtch): Observable<EntityResponseType> {
        const copy = this.convert(mtch);
        return this.http.put<Mtch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Mtch>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Mtch[]>> {
        const options = createRequestOption(req);
        return this.http.get<Mtch[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Mtch[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Mtch = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Mtch[]>): HttpResponse<Mtch[]> {
        const jsonResponse: Mtch[] = res.body;
        const body: Mtch[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Mtch.
     */
    private convertItemFromServer(mtch: Mtch): Mtch {
        const copy: Mtch = Object.assign({}, mtch);
        return copy;
    }

    /**
     * Convert a Mtch to a JSON which can be sent to the server.
     */
    private convert(mtch: Mtch): Mtch {
        const copy: Mtch = Object.assign({}, mtch);
        return copy;
    }
}
