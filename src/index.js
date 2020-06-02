'use strict';
const _ = require('lodash/fp');
class Alarms {
  constructor(serverless, options){
    this.serverless = serverless;
    this.provider = this.serverless.getProvider('aws');
    this.config = _.get('service.custom.alarms', serverless);
    this.hooks = {
          'before:aws:package:finalize:mergeCustomProviderResources': this.generate.bind(this)
    };
  }
  generate(){
    const template = this.serverless.service.provider.compiledCloudFormationTemplate;
    for(const alarm in this.config){

      var element = this.config[alarm]
      template.Resources[alarm] = {
        Type:'AWS::CloudWatch::Alarm',
        Properties:{
          ActionEnabled: element.alarmEnabled,
          AlarmActions: element.alarmActions,
          AlarmDescription: element.alarmDescription,
          AlarmName: element.alarmName,
          ComparisonOperator: element.comparisonOperator,
          DatapointsToAlarm: element.datapointsToAlarm,
          EvaluationPeriods: element.evaluationPeriods,
          InsufficientDataActions: element.insufficientDataActions,
          Metrics: element.metrics,
          OKActions: element.oKActions,
          Threshold: element.threshold,
          TreatMissingData: element.treatMissingData
        }
      }
    } 
  }
}
module.exports = Alarms;

