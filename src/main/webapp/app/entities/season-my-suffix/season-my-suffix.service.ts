import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SeasonMySuffix } from './season-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SeasonMySuffix>;

@Injectable()
export class SeasonMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/seasons';

    constructor(private http: HttpClient) { }

    create(season: SeasonMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(season);
        return this.http.post<SeasonMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(season: SeasonMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(season);
        return this.http.put<SeasonMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SeasonMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SeasonMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SeasonMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SeasonMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SeasonMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SeasonMySuffix[]>): HttpResponse<SeasonMySuffix[]> {
        const jsonResponse: SeasonMySuffix[] = res.body;
        const body: SeasonMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SeasonMySuffix.
     */
    private convertItemFromServer(season: SeasonMySuffix): SeasonMySuffix {
        const copy: SeasonMySuffix = Object.assign({}, season);
        return copy;
    }

    /**
     * Convert a SeasonMySuffix to a JSON which can be sent to the server.
     */
    private convert(season: SeasonMySuffix): SeasonMySuffix {
        const copy: SeasonMySuffix = Object.assign({}, season);
        return copy;
    }
}
