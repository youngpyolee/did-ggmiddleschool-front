import Axios from 'axios';
import Xml2json from 'xml-js';

Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const commonUtil={};

/*************************************************************************
 * 함수명 : commonUtil.replaceNull
 * 설 명 : 주어진 문자열이 null이면 ""를 돌려주고 아니면 객체본래의 값을 돌려준다.
 * @param obj  : null or blank 인지 아닌지 확인할 객체
 * @return String : 전달값이 null이면 ""를 아니면 본래의 전달값을 리턴한다.
 * ex) commonUtil.replaceNull(null) -> "", AmsModule.replaceNull("사랑해") -> "사랑해"
 **************************************************************************/
commonUtil.replaceNull = (obj) =>{
    let result="";
    if (obj==null || obj==undefined || obj === "null" || typeof obj === 'undefined' || commonUtil.trim(obj) == ""){
        result="";
    }else{
        result=obj;
    }
    return result;
};

/******************************************************************
 * 함수명 : commonUtil.datediff
 * 설 명 : /두날짜 차이 ( 년 , 월, 일 )
 * @param  sdate : 시작일
 * @param  edate : 종료일
 * ex)appJs.datediff('2015-01-05', '2016-04-10');
 *****************************************************************/
commonUtil.datediff = (sdate, edate)=>{

    let diffDate_1 =  new Date(sdate);
    let diffDate_2 =  new Date(edate);
    diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
    let diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}

/*********************************************
 * 함수명 : commonUtil.getToday
 * 설 명 : 오늘날짜 함수
 * @param len : 총물자열길이
 * @param gubunStr : 날짜구분요소
 * @returns String : 오늘날짜 문자열 String
 * ex) appJs.getToday(8,'-') -> 2012-05-09
 *     appJs.getToday() -> 20120509
 *********************************************/
commonUtil.getToday= (len, gubunStr)=>{
    if(len == undefined) {
        len = 8;
    }
    let todate = new Date();
    let result = todate.getFullYear() + "" + commonUtil.fillZero(parseInt(todate.getMonth()) + 1, 2) + "" + commonUtil.fillZero(todate.getDate(), 2) + commonUtil.fillZero(todate.getHours(), 2) + commonUtil.fillZero(todate.getMinutes(), 2) + commonUtil.fillZero(todate.getSeconds(), 2);
    result = result.substring(0, len);
    if(gubunStr != undefined) {
        result = commonUtil.getDateFormat(result, len, gubunStr);
    }
    return result;
};

/*******************************************************************
 * 함수명 : commonUtil.replaceAll
 * 설 명 : 주어진 문자열에 대하여 특정문자열에 대하여 대체문자열로 변환한값을 리턴한다.
 * @param dateStr  : 주어진 문자열
 * @param source : 변경대상문자열
 * @param target : 변경대상을 변경할 문자열
 * @return String : 최종으로 변경한 문자열
 * ex) appJs.replaceAll("2015-05-01","-","") -> '20150501'
 **********************************************************************/
commonUtil.replaceAll=(dataStr,source,target)=>{

    if (commonUtil.replaceNull(dataStr)==""){
        return "";
    }

    return dataStr.split(source).join(target);
};

/***********************************************************
 * 함수명 : commonUtil.fillZero
 * 설 명 : 정해진 cnt 자리수에 맞춰 앞쪽에 0을 채운다.
 * @param ipt  : 주어진 문자열
 * @param cnt : 주어진 문자열갯수
 * @return String : 0으로 채운문자열
 * ex) fillZero('2014',5) -> '02014
 ************************************************************/
commonUtil.fillZero= (ipt, cnt)=>{
    let tgt = ipt + "";
    while(tgt.length < cnt)	{
        tgt = "0" + tgt;
    }
    return tgt;
};

/*******************************************************************
 * 함수명 : commonUtil.getDateFormat
 * 설 명 : 주어진 문자열을 gubunStr으로 포맷하여 리턴한다.
 * @param dateStr  : 주어진 문자열
 * @param fixSeat : fixSeat를 지정해주면 자리수가 길어도 fixSeat자리수 만큼만 처리한다.
 * @param gubunStr : 포맷할 문자열
 * @return String : 포맷한 문자열
 * ex) appJs.getDateFormat('20150501',8,"-") -> '2015-05-01'
 * 날짜 문자열을 	14자리 -> '2010-05-05 11:22:33'
 12자리 -> '2010-05-05 11:22'
 8자리  -> '2010-05-05'
 6자리  -> '2010-05'
 *************************************************************************/
commonUtil.getDateFormat= (dateStr, fixSeat, gubunStr)=>{

    if(gubunStr == undefined) {
        gubunStr = "-";
    }
    if(Object.prototype.toString.call(dateStr)  != '[object String]') {
        return "";
    }
    dateStr = commonUtil.replaceAll(dateStr,gubunStr, "");
    if(dateStr.length > fixSeat) {
        dateStr = dateStr.substring(0, fixSeat);
    }
    if(dateStr.length == 6){
        return dateStr.substring(0, 4) + gubunStr + dateStr.substring(4, 6);
    }
    if(dateStr.length < 8) {
        return null;
    }


    let yyyy = dateStr.substring(0, 4);
    let mm = dateStr.substring(4, 6);
    let dd = dateStr.substring(6, 8);
    let result = yyyy + gubunStr + mm + gubunStr + dd;

    if(dateStr.length > 11)	{
        let hh = dateStr.substring(8, 10);
        let ii = dateStr.substring(10, 12);
        result = result + " " + hh + ":" + ii;
    }
    if(dateStr.length == 14)	{
        let ss = dateStr.substring(12, 14);
        result = result + ":" + ss;
    }
    return result;

};


/*************************************************************************
 * 함수명 : commonUtil.objectNull
 * 설 명 : 주어진 객체가 null이면 true 를 돌려주고 아니면 false값을 돌려준다.
 * @param obj  : null or blank 인지 아닌지 확인할 객체
 * @return String : 전달값이 null이면 ""를 아니면 본래의 전달값을 리턴한다.
 * ex) commonUtil.objectNull(obj) -> true,false
 **************************************************************************/
commonUtil.objectNull=(obj)=>{
    let trueFalse=false;
    if (obj==null || obj==undefined || obj === "null" || typeof obj === 'undefined'){
        trueFalse=true;
    }
    return trueFalse;
}

commonUtil.getLastDay=(ymd)=>{
    return new Date(ymd.getFullYear(), ymd.getMonth(), 0);
}

/*********************************************
 * 함수명 : commonUtil.trim
 * 설 명 : 주어진 문자열의 공백을 제거한 문자열을 리턴한다.
 * @param str : 공백을 제거할 문자열
 * @return String
 * ex) commonUtil.trim("aaa ") --> "aaa"
 *********************************************/
commonUtil.trim=(str)=>{
    return str==null?null:(str+"").replace(/^\s*|\s*$/g,"");
};

/**
 * 함수명 : convertXmltoJson.trim
 * 설 명 : 주어진 xml데이터를 json데이터로 변경한다.
 * @param str : 공백을 제거할 문자열
 * @return String
 * ex) commonUtil.trim("aaa ") --> "aaa"
 */
commonUtil.convertXmltoJson = (xmlData)=>{
    function nativeType (value) {
        /*let nValue = Number(value);
        if (!isNaN(nValue)) {
            return nValue;
        }*/
        let bValue = value.toLowerCase();
        if (bValue === 'true') {
            return true;
        } else if (bValue === 'false') {
            return false;
        }
        return value;
    };

    let removeJsonTextAttribute = function(value, parentElement) {
        try {
            let keyNo = Object.keys(parentElement._parent).length;
            let keyName = Object.keys(parentElement._parent)[keyNo - 1];
            parentElement._parent[keyName] = nativeType(value);
        } catch (e) {}
    }
    let options = {compact: true, ignoreDeclaration:true,  trim: true,ignoreComment:true,ignoreDoctype:true, spaces: 4, textFn: removeJsonTextAttribute, cdataFn:removeJsonTextAttribute}
    let result = JSON.parse(Xml2json.xml2json(xmlData, options));


    return result;
}
/**
 * list 형의  xml 데이터를 json으로 전달할경우
 * @param xmlData
 * @returns {any}
 */
commonUtil.convertListXmltoJson = (xmlData)=>{
    function nativeType (value) {
        /*let nValue = Number(value);
        if (!isNaN(nValue)) {
            return nValue;
        }*/
        let bValue = value.toLowerCase();
        if (bValue === 'true') {
            return true;
        } else if (bValue === 'false') {
            return false;
        }
        return value;
    };

    let removeJsonTextAttribute = function(value, parentElement) {
        try {
            let keyNo = Object.keys(parentElement._parent).length;
            let keyName = Object.keys(parentElement._parent)[keyNo - 1];
            parentElement._parent[keyName] = nativeType(value);
        } catch (e) {}
    }
    let options = {compact: true, ignoreDeclaration:true,  trim: true,ignoreComment:true,ignoreDoctype:true, spaces: 4, textFn: removeJsonTextAttribute, cdataFn:removeJsonTextAttribute}
    let result = JSON.parse(Xml2json.xml2json(xmlData, options));




    return result;
}


/**
 * 함수명 : convertXmltoJson.trim
 * 설 명 : 주어진 xml데이터를 json데이터로 변경한다.
 * @param str : 공백을 제거할 문자열
 * @return String
 * ex) commonUtil.trim("aaa ") --> "aaa"
 */
commonUtil.convertXmlto2Json = (xmlData)=>{
    function nativeType (value) {
        let nValue = Number(value);
        if (!isNaN(nValue)) {
            return nValue;
        }
        let bValue = value.toLowerCase();
        if (bValue === 'true') {
            return true;
        } else if (bValue === 'false') {
            return false;
        }
        return value;
    };

    let removeJsonTextAttribute = function(value, parentElement) {
        try {
            let keyNo = Object.keys(parentElement._parent).length;
            let keyName = Object.keys(parentElement._parent)[keyNo - 1];
            parentElement._parent[keyName] = nativeType(value);
        } catch (e) {}
    }
    let options = {compact: true, ignoreDeclaration:true,  trim: true,ignoreComment:true,ignoreDoctype:true, spaces: 4, textFn: removeJsonTextAttribute,}
    let result = JSON.parse(Xml2json.xml2json(xmlData, options));
    return result;
}


commonUtil.localStorageSave=(key,value)=>{
    localStorage.setItem(key,value)
};

commonUtil.localStorageRemove=(key,value)=>{
    localStorage.removeItem(key)
};

commonUtil.localStorageInfo=(key)=>{
    return localStorage.getItem(key)
};

/********************************************************************
 * 함수명 : ajaxGetAsyncProc
 * 설 명 : Axios 를 이용하여 동기로 get으로 호출 할 경우
 **********************************************************************/
commonUtil.ajaxGetSyncProc =  async (url,payload)=>{
    let config = { params:payload};

    let resultData = {}
    try{
        resultData= await  Axios.get(url, config);
    }catch(e){
        return {"result":"N","msg":"관리자에게 문의해 주세요"}
    }
    return resultData.data;
};

/********************************************************************
 * 함수명 : ajaxGetSyncProc
 * 설 명 : Axios 를 이용하여 비동기로 get으로 호출 할 경우
 **********************************************************************/
commonUtil.ajaxGetAsyncProc =  (url,payload)=>{
    let config = { params:payload};
    return Axios.get(url, config);
};

/********************************************************************
 * 함수명 : ajaxGetAsyncJsonProc
 * 설 명 : Axios 를 이용하여 동기로 get으로 호출 할 경우
 **********************************************************************/

commonUtil.ajaxGetSyncJsonProc =  async(url,payload)=>{

    let returnData = {}
    try{
        let resultData= await  Axios.get(url, {  headers: {'Content-Type': 'application/json'} , params:payload});
        returnData.result="Y";
        returnData.data = resultData.data;
    }catch(e){
        return {"result":"N","msg":"관리자에게 문의해 주세요"}
    }
    return returnData
};

/********************************************************************
 * 함수명 : ajaxGetAsyncJsonProc
 * 설 명 : Axios 를 이용하여 비동기로 get으로 호출 할 경우
 **********************************************************************/

commonUtil.ajaxGetAsyncJsonParamProc =  (url,payload)=>{

    let config = {  headers: {'Content-Type': 'application/json'} ,params:payload}
    return  Axios.get(url, config);
};

/********************************************************************
 * 함수명 : staticAccess
 * 설 명 : 통계를 처리한다. 지역코드, 통계코드, 장비코드
 **********************************************************************/
commonUtil.staticAccess=(searchUrl,pdidCd,pdidEqpmnCd,pstatsCd)=>{
    if (commonUtil.replaceNull(pstatsCd) !="" && pstatsCd.toString() !="[object Object]"){
        let searchParam = new URLSearchParams();
        searchParam.append("didCd"      ,pdidCd);
        searchParam.append("didEqpmnCd" ,pdidEqpmnCd);
        searchParam.append("statsCd"    ,pstatsCd);
        commonUtil.ajaxPostProc(searchUrl,searchParam);
    }
};

/********************************************************************
 * 함수명 : ajaxGetProc
 * 설 명 : Axios 를 이용하여 비동기로 get으로 호출 할 경우
 **********************************************************************/
commonUtil.ajaxGetProc=(url,searchParams,successProc,failProc)=>{
    Axios.get(url,{params:searchParams})
        .then((response) => {
            successProc(response.data);
        })
        .catch((error)=>{
            if (typeof failProc !== "undefined" &&  failProc!=null){
                failProc(error);
            }else{
                if (error.response !=null ){
                    //comment
                }else{
                    //comment
                }
            }
        });
};

/********************************************************************
 * 함수명 : ajaxAsyncPostProc
 * 설 명 : Axios 를 이용하여 동기 호출 할 경우
 **********************************************************************/
commonUtil.ajaxAsyncPostProc =  async (url,params)=>{
    return await Axios.post(url, params)
        .then((response) => {
            return response.data;
        }).catch((error)=>{
            return {"result":"N","msg":"관리자에게 문의해 주세요"}
        });
};

/********************************************************************
 * 함수명 : ajaxProc
 * 설 명 : Axios를 이용하여 비동기로 호출 할 경우
 **********************************************************************/
commonUtil.ajaxProc=(url,params)=>{
    Axios.post(url, params)
        .then((response) => {
            successProc(response.data);
        })
        .catch((error)=>{
            if (typeof failProc !== "undefined" &&  failProc!=null){
                failProc(error);
            }else{
                if (error.response !=null ){
                    //comment
                }else{
                    console.log("commonUtil.ajaxProc "+error);
                }
            }
        });
};

/********************************************************************
 * 함수명 : ajaxProcTest post
 * 설 명 : Axios 를 이용하여 비동기로 호출 할 경우
 **********************************************************************/
commonUtil.ajaxProcTest=()=>{
    Axios.post('http://192.168.0.19:8081/xml_did/nadry01_03.json', {
        id: 'miiin',
        message: 'hi'
    })
        .then( response => { console.log(response) } )
        .catch( response => {
            console.log("error")
            console.log(response)
        } );
};

/********************************************************************
 * 함수명 : ajaxAsyncProc
 * 설 명 : Axios 를 이용하여 동기 호출 할 경우
 **********************************************************************/
commonUtil.ajaxAsyncProc =  async (url,params)=>{
    return await Axios.post(url, params)
        .then((response) => {
            return response.data;
        }).catch((error)=>{
            console.log("commonUtil.ajaxAsyncProc "+error);
            return {"result":"N","msg":"관리자에게 문의해 주세요"}
        });
};

/********************************************************************
 * 함수명 : ajaxAsyncProc
 * 설 명 : Axios 를 이용하여 동기 호출 할 경우
 **********************************************************************/
commonUtil.ajaxAsyncJsonConvertProc =  (url,params)=>{
    return Axios.post(url, params)
        .then((response) => {
            if (response.data !=null ){
                let xml = response.data
                let json = convert.xml2json(xml, { compact: true })
                let jsonData = JSON.parse(json);
                return jsonData;
            }
            return response.data;
        }).catch((error)=>{
            console.log("commonUtil.ajaxAsyncJsonConvertProc "+error);
            return {"result":"N","msg":"관리자에게 문의해 주세요"}
        });
};

/********************************************************************
 * 함수명 : ajaxAsyncProc
 * 설 명 : Axios 를 이용하여 동기 호출 할 경우
 **********************************************************************/
commonUtil.ajaxPostProc =  (url,params)=>{
    return  Axios.post(url, params);
};

/********************************************************************
 * 함수명 : groupDivide
 * 설 명 : xml목록데이터를 14개씩 그룹으로 나누어 목록에 담음
 * ex) commonUtil.groupDivide(dataList) --> [{"group":[]},{"group":[]},{"group":[]},{"group":[]},]
 **********************************************************************/
commonUtil.groupDivide=(dataList,diviceCount)=>{
    let groupCount=diviceCount;
    let returnData=[]
    let data={}
    let rowCnt = dataList.length;
    if (rowCnt <= groupCount){
        returnData.push({"groupList":dataList});
    }else{
        let temDataList=[];
        let temCount=0;
        for (let start=0; start < rowCnt; start++){
            if (start==0){
                temDataList.push(dataList[start])
            }else if ((start+1) % groupCount !=0){
                temDataList.push(dataList[start])
            }else if ((start+1)% groupCount ==0 || start <rowCnt-1){
                temDataList.push(dataList[start])
                returnData.push({"groupList":temDataList});
                temDataList=[]
            }
        }
    }
    return returnData;
}


/********************************************************************
 * 함수명 : xmlMappingList
 * 설 명 : xml목록데이터를 mapping처리한다.
 * ex) commonUtil.xmlMappingList(dataList,dataType)
 **********************************************************************/
commonUtil.getDataConfig = (xmlData)=>{
    let jsonData = commonUtil.convertXmltoJson(xmlData);

    let resultData = {};
    resultData = { ... jsonData.config }
    resultData.itemList=[]

    let prevItemList = jsonData.config.itemList.item;
    let itemList = [];
    itemList=prevItemList.map((data)=>{
        let returnData = data;
        let subItemList=[];
        if (data.subItemList !=null){
            if (Array.isArray(data.subItemList.subItem)){
                data.subItemList.subItem.forEach((data2)=>{
                    subItemList.push(data2)
                })
            }else{
                subItemList.push(data.subItemList.subItem)
            }
        }
        returnData.activeYn="N";
        returnData.subItemList=subItemList;
        return returnData;
    });

    resultData.itemList=itemList;
    return resultData;
}


/**
 * 전체메뉴목록아이템에서 특정 인덱스를 기준으로 subitem정보를 얻는 방법
 * @param pItemList
 * @param pItemNo
 * @returns {*}
 */
commonUtil.getConfigItemData=(pItemList,pItemNo)=>{
    let itemIndex = pItemList.findIndex((itemData,itemIndex)=>{
        if (itemData.itemIndex == pItemNo){
            return true;
        }
    });
    return pItemList[itemIndex];
}
/**
 * 메뉴목록컴포넌트에서 컴포넌트명을 기준으로 서브정보를 얻어온다.
 * @param pItemList
 * @param pComp
 * @returns {*}
 */
commonUtil.getConfigCompItemData=(pItemList,pComp)=>{
    let itemIndex = pItemList.findIndex((itemData,itemIndex)=>{
        if (itemData.comp == pComp){
            return true;
        }
    });
    return pItemList[itemIndex];
}
/**
 * 특정메뉴아이템의 서브아이템 목록에서 특정컴포넌트로 데이터를 얻음
 * @param pItemList
 * @param pSubComp
 * @returns {*}
 */
commonUtil.getConfigSubCompData=(pItemList,pSubComp)=>{
    let itemIndex = pItemList.findIndex((itemData,itemIndex)=>{
        if (itemData.subComp == pSubComp){
            return true;
        }
    });
    return pItemList[itemIndex];
}

commonUtil.getConfigSubItemData=(pItemList,pItemNo)=>{
    let itemIndex = pItemList.findIndex((itemData,itemIndex)=>{
        if (itemData.subIndex == pItemNo){
            return true;
        }
    });
    return pItemList[itemIndex];
}

commonUtil.getUuid = ()=>{
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

commonUtil.dataFrameToJson = (dataFrame)=>{
    let columsArr = dataFrame.columns;
    let returnObject={};
    columsArr.forEach((colum)=>{
        returnObject[colum]= dataFrame[colum].values[0]
    })

    return returnObject;
}


commonUtil.dataFrameListToJson = (dataFrame)=>{
    let columsList = dataFrame.columns;
    let returnObjectList=[];
    let rowCnt = dataFrame.values.length;
    let start =0;

    for (start=0; start<rowCnt; start++){

        let dataObject={};
        let sub=0;
        for (sub=0;sub<columsList.length;sub++){
            let dataStr = columsList[sub];
            //dataFrame.iloc(start)
            dataObject[dataStr]=dataFrame[dataStr].values[start]
        }


        returnObjectList.push(dataObject);
    }
    return returnObjectList;
}



export default commonUtil;