import Axios from 'axios';
import Xml2json from 'xml-js';

const highschoolUtil={};
/*

 */
highschoolUtil.getSectionAreaCntList = (searchSection,sourceList)=>{
    let returnList=[];
    let sourceSize = sourceList.length;
    for (let i=0; i<sourceSize;i++){
        if (sourceList[i].section ==searchSection ){
            returnList = sourceList[i].dataList;
            break;
        }
    }

    return returnList;
}



export default highschoolUtil;