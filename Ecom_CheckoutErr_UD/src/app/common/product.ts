export class Product {
        
    constructor(public id: number,
                public sku: String,
                public categoryName: String,
                public name: String,
                public description: String,
                public unitPrice: number,
                public imageUrl: String,
                public activString: boolean,
                public unitsInStock:number,
                public dateCreated: Date,
                public lastUpdated: String,
                public page:{size:number,
                            totalElements:number,
                            totalPages:number,
                            number:number}){
        
        // constructor code goes here
    }
        
}
