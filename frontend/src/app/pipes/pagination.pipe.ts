import {  Pipe, PipeTransform} from "@angular/core";


@Pipe({name:'paginator'})


export class PaginatorPipe implements PipeTransform{

  transform(data, page ,pageSize){
    parseInt(page);
    if(!pageSize){
      pageSize = 10
    }

    if(page==1){
        return data.slice(0,pageSize);
    }else if(page>1){
      return data.slice((pageSize*(page-1)),pageSize*page);
    }

  }

}
