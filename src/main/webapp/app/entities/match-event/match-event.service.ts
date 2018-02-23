import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MatchEvent } from './match-event.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<MatchEvent>;

@Injectable()
export class MatchEventService {

    private resourceUrl =  SERVER_API_URL + 'api/match-events';

    constructor(private http: HttpClient) { }

    create(matchEvent: MatchEvent): Observable<EntityResponseType> {
        const copy = this.convert(matchEvent);
        return this.http.post<MatchEvent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(matchEvent: MatchEvent): Observable<EntityResponseType> {
        const copy = this.convert(matchEvent);
        return this.http.put<MatchEvent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<MatchEvent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<MatchEvent[]>> {
        const options = createRequestOption(req);
        return this.http.get<MatchEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<MatchEvent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: MatchEvent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<MatchEvent[]>): HttpResponse<MatchEvent[]> {
        const jsonResponse: MatchEvent[] = res.body;
        const body: MatchEvent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MatchEvent.
     */
    private convertItemFromServer(matchEvent: MatchEvent): MatchEvent {
        const copy: MatchEvent = Object.assign({}, matchEvent);
        return copy;
    }

    /**
     * Convert a MatchEvent to a JSON which can be sent to the server.
     */
    private convert(matchEvent: MatchEvent): MatchEvent {
        const copy: MatchEvent = Object.assign({}, matchEvent);
        return copy;
    }
}
