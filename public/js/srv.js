
var	sampleSrv = angular.module("sampleSrv",	[]);

sampleSrv.factory("dataServices", ['$http',
function($http)	{

	this.getScore	=	function(context, p) {
		/* create the scoring input object */
		var input = {
			tablename: 'scoreInput',
			header: [ 'id','target_mv',	'D_AGE', 'O_ALBUMIN_MIN', 'O_BMI_MIN', 'O_CREATININE_BLOOD_MAX', 'O_GFR_MIN' ,'O_GLUCOSE_BLOOD_MIN','O_HBA1C_AVG'],
			data: [[ p.id, p.target, p.Age, p.ALBUMIN, p.BMI, p.CREA, p.GFR, p.GLUCOSE, p.HBA1C ]]
		};

		/* call	scoring service	to generate results */
		return $http({	method: "post",
										url: "score",
                    data: { context: context, input: input }
                 })
			.success(function(data, status, headers, config) {
				return data;
			})
			.error(function(data, status, headers, config) {
				return status;
			});
	}

	return this;
}]);

sampleSrv.factory("dialogServices",	['$modal',
function($modal) {

	this.resultsDlg	=	function (r) {
		return $modal.open({
			templateUrl: 'partials/scoreResults.html',
			controller:	'ResultsCtrl',
			size:	'lg',
			resolve: {
				rspHeader: function	() {
					return r[0].header;
				},
				rspData: function	() {
					return r[0].data;
				}
			}
		});
	}

	this.errorDlg = function(msgTitle,	msgText) {
		return	$modal.open({
			templateUrl: 'partials/error.html',
			controller:	'ErrorCtrl',
			size:	'lg',
			resolve: {
				msgTitle:	function ()	{
					return msgTitle;
				},
				message: function	() {
					return msgText;
				}
			}
		});
	}

	return this;
}]);
