export interface IDetail {
    name: string;
    bild: string;
    beschreibung: string;
    bewertung?: string; 
    trailer?: string;  
}

export interface MovieComponentProps<T extends IDetail> {
    fetchEndpoint: string; 
    entityName: string;   
    dataMapper?: (data: any) => T[]; 
}