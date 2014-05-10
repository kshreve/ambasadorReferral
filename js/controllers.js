//Just going to use previous projects database, and add a new collection to it.
var baseURL = "https://api.mongolab.com/api/1/databases/prankings/collections/ambassadorReferral"
var apiKey = "?apiKey=FmIllpfosmgRaRMQtSEVwizeCBTLl2w1"
var url = baseURL + apiKey;

// referral
/*{ 
    "Id": 1,
    "Name": "spartans",
    "Clicks": 0,
    "Active": 1,
    "CreationDate": new Date()
}*/

function HomeCtrl($scope, $location, $http) {
    $scope.referrals=[];
    $scope.sortColumn='Clicks';
    $scope.reverseSort = false;
    
    $scope.updateList = function() {
        $http.get(url).success(function(data, status, headers, config){
            $scope.referrals = data;
        });
    };
      
    $scope.Add = function() {
        var text = document.getElementById("input").value;
        var nextId = -1;
        
        for(var i=0; i < $scope.referrals.length; i++){
            if(text === $scope.referrals[i].Name)
            {
                nextId = -2;
            }
            else 
            {
                nextId = $scope.referrals[$scope.referrals.length-1].Id+1;
            }
        }
        if($scope.referrals.length === 0) 
        {
            nextId = 1;
        }
        
        var toAdd = {"Id": nextId, "Name": text, "Clicks":0,"Active": 1, "CreationDate": new Date()};
        if((text !== null) && (text.length > 0))
        {      
            if(toAdd.Id > 0)
            {
                $http.post(url, toAdd)
                    .success(function() { console.log("successfully added new referral."); $scope.errorMsg="";})
                    .error(function() { console.log("error when adding new referral.")});
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
    }
    
    $scope.updateList();
}

function LinkCtrl($scope,$location,$http){
    
}