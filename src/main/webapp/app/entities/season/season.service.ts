import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Season } from './season.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Season>;

@Injectable()
export class SeasonService {

    private resourceUrl =  SERVER_API_URL + 'api/seasons';

    constructor(private http: HttpClient) { }

    create(season: Season): Observable<EntityResponseType> {
        const copy = this.convert(season);
        return this.http.post<Season>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(season: Season): Observable<EntityResponseType> {
        const copy = this.convert(season);
        return this.http.put<Season>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Season>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Season[]>> {
        const options = createRequestOption(req);
        return this.http.get<Season[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Season[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Season = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Season[]>): HttpResponse<Season[]> {
        const jsonResponse: Season[] = res.body;
        const body: Season[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Season.
     */
    private convertItemFromServer(season: Season): Season {
        const copy: Season = Object.assign({}, season);
        return copy;
    }

    /**
     * Convert a Season to a JSON which can be sent to the server.
     */
    private convert(season: Season): Season {
        const copy: Season = Object.assign({}, season);
        return copy;
    }
}
