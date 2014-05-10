//Just going to use previous projects database, and add a new collection to it.
var getURL = "https://api.mongolab.com/api/1/databases/prankings/collections/ambassadorReferrals?apiKey=FmIllpfosmgRaRMQtSEVwizeCBTLl2w1";
var baseURL = "https://api.mongolab.com/api/1/databases/prankings/collections/ambassadorReferrals/";
var apiKey = "?apiKey=FmIllpfosmgRaRMQtSEVwizeCBTLl2w1";

// referral
/*{ 
    "Id": 1,
    "Name": "spartans",
    "Clicks": 0,
    "Active": 1,
    "CreationDate": new Date()
}*/

function isUniqueName($scope,text){
    var ret = true;
    for(var i=0; i < $scope.referrals.length; i++){
        if(text === $scope.referrals[i].Name)
        {
            ret = false;
        }
    }
    return ret;
}

function HomeCtrl($scope, $location, $http) {
    $scope.referrals=[];
    $scope.sortColumn='Clicks';
    $scope.reverseSort = false;
    $scope.editThisReferral;
    
    $scope.updateList = function() {
        $http.get(getURL).success(function(data, status, headers, config){
            $scope.referrals = data;
        });
    };
      
    $scope.Add = function() {
        var input = document.getElementById("input");
        var text = input.value;
        var nextId = -1;
        
        if(isUniqueName($scope,text)){
            if($scope.referrals[$scope.referrals.length-1])
            {
                nextId = $scope.referrals[$scope.referrals.length-1].Id+1;
            }
        }
        else
        {
            nextId = -2;
        }
        
        //default case
        if($scope.referrals.length === 0) 
        {
            nextId = 1;
        }
        
        var toAdd = {"Id": nextId, "Name": text, "Clicks":0,"Active": 1, "CreationDate": new Date()};
        if((text !== null) && (text.length > 0))
        {      
            if(toAdd.Id > 0)
            {
                $http.post(getURL, toAdd)
                    .success(function() { console.log("successfully added new referral.");  $scope.errorMsg="";})
                    .error(function() { console.log("error when adding new referral.")});
                
                input.value="";
            }
            else if( toAdd.Id === -2)
            {
                $scope.errorMsg = "Non Unique referral";
            }
            else 
            {
                $scope.errorMsg = "Please try again";
            }
        }
        else 
        {
            $scope.errorMsg = "Text empty, please fill out and resubmit.";
        }
       
        $scope.updateList();
        document.getElementById('input').focus();
    }
    
    $scope.Save = function() {
        var toUpdate = $scope.editThisReferral;
        var text = document.getElementById('editInput').value;
       
        if(isUniqueName($scope,text))
        {
            toUpdate.Name = text;
            //baseURL+toUpdate._id.$oid+apiKey,
            //$http.put(baseURL+toUpdate._id.$oid+apiKey,JSON.stringify(toUpdate))
            $http.put(baseURL+toUpdate._id.$oid+apiKey,JSON.stringify(toUpdate)).success(function(data){
                console.log("successfully saved items");
                $scope.errorMsg = "";
                $scope.editThisReferral = null;
                document.getElementById('input').focus();
                $scope.updateList();
            }).error(function(data,status,headers,config) {console.log("error saving")});
        }
        else
        {
            $scope.errorMsg = "Your edit is in conflict with an existing link";
        }
    }
    
    $scope.Remove = function(toDelete) {
        $http.get(getURL).success(function(data){ 
            for(var i=0; i<data.length;i++){
                if(data[i].Name == toDelete.Name)
                {
                    data[i].Active = 0;
                }
            }
            
            $http.put(getURL,JSON.stringify(data)).success(function(data){
                console.log("success deleted item");
                $scope.updateList();
            }).error(function(){console.log("error deleting item")});
        });
    }
    
    $scope.Edit = function(toEdit) {
        $scope.editThisReferral = toEdit;
    }
    
    $scope.CancelEdit = function () {
        $scope.editThisReferral = null;
    }
    
    $scope.updateList();
}

function LandingCtrl($scope,$location,$http){
    var toUpdate = {};
    $scope.Name = $location.search().link;
    $http.get(getURL).success(function(data){
        for(var i=0;i<data.length;i++)
        {
            if(data[i].Name == $location.search().link)
            {
                toUpdate = data[i];
                toUpdate.Clicks +=1; 
                $http.put(baseURL+toUpdate._id.$oid+apiKey,JSON.stringify(toUpdate)).success(function(data){console.log('success update to DB')})
                    .error(function(data){console.log("error on update to DB")});
                break;
            }
        }
    });
}