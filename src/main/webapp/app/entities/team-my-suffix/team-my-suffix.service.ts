import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TeamMySuffix } from './team-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TeamMySuffix>;

@Injectable()
export class TeamMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/teams';

    constructor(private http: HttpClient) { }

    create(team: TeamMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(team);
        return this.http.post<TeamMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(team: TeamMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(team);
        return this.http.put<TeamMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TeamMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TeamMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TeamMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TeamMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TeamMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TeamMySuffix[]>): HttpResponse<TeamMySuffix[]> {
        const jsonResponse: TeamMySuffix[] = res.body;
        const body: TeamMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TeamMySuffix.
     */
    private convertItemFromServer(team: TeamMySuffix): TeamMySuffix {
        const copy: TeamMySuffix = Object.assign({}, team);
        return copy;
    }

    /**
     * Convert a TeamMySuffix to a JSON which can be sent to the server.
     */
    private convert(team: TeamMySuffix): TeamMySuffix {
        const copy: TeamMySuffix = Object.assign({}, team);
        return copy;
    }
}
