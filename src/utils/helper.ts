
export interface Err{
    message: string
}

export interface IPlayerResult{
    name:string;
    score:number;
    perfect:boolean;
}

export class Player {
    name:string;
    rollsScore:number[] = [];
    currentRoll:number;
    isExtra:boolean = false;

    constructor(name:string){
        this.name = name;
        for(let i = 0; i < 22; i++){
            this.rollsScore.push(0);
        }
        this.currentRoll = 0;
    }
}

export class FetchFacad{
    private static fetchFacad:FetchFacad|null;

    public static getFetchFacad(){
        if(this.fetchFacad == null){
            this.fetchFacad = new FetchFacad();
        }

        return this.fetchFacad;
    }

    async getData<ReturnType>(url:string):Promise<ReturnType|Err>{
        try{
            const response = await fetch(url, {
              headers:{
                "Content-Type": "application/json"
              }
            });
            const result = await response.json();
            return result as ReturnType;
        }catch(err){
            return {
                message: err
            } as Err;
        }
    }

    async postData<DataType, ReturnType>(url:string, data:DataType):Promise<ReturnType|Err>{
        try{
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(data)
            });
            const result = await response.json();
            return result as ReturnType;
        }catch(err){
            return {
                message: err
            } as Err;
        }
    }
}


export function mapPlayers(players:Player[]){
    // any becuase i don't know players number
    const mappedPlayer:any = {};
    for(const player of players){
        mappedPlayer[player.name] = player.rollsScore
    }

    return mappedPlayer;
}