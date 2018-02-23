import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Round } from './round.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Round>;

@Injectable()
export class RoundService {

    private resourceUrl =  SERVER_API_URL + 'api/rounds';

    constructor(private http: HttpClient) { }

    create(round: Round): Observable<EntityResponseType> {
        const copy = this.convert(round);
        return this.http.post<Round>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(round: Round): Observable<EntityResponseType> {
        const copy = this.convert(round);
        return this.http.put<Round>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Round>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Round[]>> {
        const options = createRequestOption(req);
        return this.http.get<Round[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Round[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Round = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Round[]>): HttpResponse<Round[]> {
        const jsonResponse: Round[] = res.body;
        const body: Round[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Round.
     */
    private convertItemFromServer(round: Round): Round {
        const copy: Round = Object.assign({}, round);
        return copy;
    }

    /**
     * Convert a Round to a JSON which can be sent to the server.
     */
    private convert(round: Round): Round {
        const copy: Round = Object.assign({}, round);
        return copy;
    }
}
