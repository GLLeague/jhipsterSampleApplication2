import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RoundMySuffix } from './round-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RoundMySuffix>;

@Injectable()
export class RoundMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/rounds';

    constructor(private http: HttpClient) { }

    create(round: RoundMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(round);
        return this.http.post<RoundMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(round: RoundMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(round);
        return this.http.put<RoundMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RoundMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RoundMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RoundMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RoundMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RoundMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RoundMySuffix[]>): HttpResponse<RoundMySuffix[]> {
        const jsonResponse: RoundMySuffix[] = res.body;
        const body: RoundMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RoundMySuffix.
     */
    private convertItemFromServer(round: RoundMySuffix): RoundMySuffix {
        const copy: RoundMySuffix = Object.assign({}, round);
        return copy;
    }

    /**
     * Convert a RoundMySuffix to a JSON which can be sent to the server.
     */
    private convert(round: RoundMySuffix): RoundMySuffix {
        const copy: RoundMySuffix = Object.assign({}, round);
        return copy;
    }
}
