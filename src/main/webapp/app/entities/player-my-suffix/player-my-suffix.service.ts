import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PlayerMySuffix } from './player-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PlayerMySuffix>;

@Injectable()
export class PlayerMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/players';

    constructor(private http: HttpClient) { }

    create(player: PlayerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(player);
        return this.http.post<PlayerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(player: PlayerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(player);
        return this.http.put<PlayerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PlayerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PlayerMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<PlayerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PlayerMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PlayerMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PlayerMySuffix[]>): HttpResponse<PlayerMySuffix[]> {
        const jsonResponse: PlayerMySuffix[] = res.body;
        const body: PlayerMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PlayerMySuffix.
     */
    private convertItemFromServer(player: PlayerMySuffix): PlayerMySuffix {
        const copy: PlayerMySuffix = Object.assign({}, player);
        return copy;
    }

    /**
     * Convert a PlayerMySuffix to a JSON which can be sent to the server.
     */
    private convert(player: PlayerMySuffix): PlayerMySuffix {
        const copy: PlayerMySuffix = Object.assign({}, player);
        return copy;
    }
}
