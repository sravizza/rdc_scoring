
var drug1nSample = angular.module("drug1nSample", ['ui.bootstrap', 'sampleSrv']);

var	AppCtrl	=	['$scope',	'dialogServices', 'dataServices',
function AppCtrl($scope,	dialogServices, dataServices)	{

	// context ID is a configuration constant in this example
	$scope.context = 'd_scoring_v002_001';

	// init UI data model
	$scope.p =
		{ Id:'1',	target:'1', Age:'60', ALBUMIN:'4', BMI:'30', CREA:'1' ,GFR:'65',GLUCOSE:'125',HBA1C:'7.5' };



	$scope.score = function()	{
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.data.flag !== false && rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					console.error(rtn.data.message);
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	}

	$scope.showResults = function(rspHeader, rspData) {
		dialogServices.resultsDlg(rspHeader, rspData).result.then();
	}

	$scope.showError = function(msgText) {
		dialogServices.errorDlg("Error", msgText).result.then();
	}

		/**/

}]

var	ResultsCtrl = ['$scope',	'$modalInstance',	'rspHeader', 'rspData',
function ResultsCtrl($scope,	$modalInstance, rspHeader, rspData) {
	$scope.rspHeader = rspHeader;
	$scope.rspData = rspData[0];

	$scope.getStyle = function(pred,pred_value){
		if(pred == "REST")
			return {'color':'green'};
		else if(pred == "CKD" && pred_value < 0.7)
			return {'color':'orange'};
		else if(pred == "CKD" && pred_value >= 0.7 )
			return {'color':'red'};
		}


		$scope.getValue = function(pred,pred_value){
			if(pred == "REST")
				return (1 - pred_value)*100 ;
			else
				return pred_value*100;

			}


	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

var	ErrorCtrl = ['$scope',	'$modalInstance',	'msgTitle',	'message',
function ErrorCtrl($scope,	$modalInstance,	msgTitle,	message) {

	$scope.msgTitle	=	msgTitle;
	$scope.message = message;

	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]


drug1nSample.controller("AppCtrl",	AppCtrl);
drug1nSample.controller("ResultsCtrl", ResultsCtrl);
drug1nSample.controller("ErrorCtrl", ErrorCtrl);
