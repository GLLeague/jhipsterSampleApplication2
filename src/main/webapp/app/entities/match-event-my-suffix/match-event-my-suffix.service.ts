import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MatchEventMySuffix } from './match-event-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MatchEventMySuffix>;

@Injectable()
export class MatchEventMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/match-events';

    constructor(private http: HttpClient) { }

    create(matchEvent: MatchEventMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(matchEvent);
        return this.http.post<MatchEventMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(matchEvent: MatchEventMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(matchEvent);
        return this.http.put<MatchEventMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MatchEventMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MatchEventMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<MatchEventMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MatchEventMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MatchEventMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MatchEventMySuffix[]>): HttpResponse<MatchEventMySuffix[]> {
        const jsonResponse: MatchEventMySuffix[] = res.body;
        const body: MatchEventMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MatchEventMySuffix.
     */
    private convertItemFromServer(matchEvent: MatchEventMySuffix): MatchEventMySuffix {
        const copy: MatchEventMySuffix = Object.assign({}, matchEvent);
        return copy;
    }

    /**
     * Convert a MatchEventMySuffix to a JSON which can be sent to the server.
     */
    private convert(matchEvent: MatchEventMySuffix): MatchEventMySuffix {
        const copy: MatchEventMySuffix = Object.assign({}, matchEvent);
        return copy;
    }
}
