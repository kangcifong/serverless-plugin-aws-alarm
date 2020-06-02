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
      console.log(element.metrics);
      template.Resources[alarm] = {
        Type:'AWS::CloudWatch::Alarm',
        Properties:{
          AlarmName: element.alarmName,
          AlarmDescription: element.alarmDescription,
          ActionEnabled: element.alarmEnabled,
          AlarmActions: element.alarmActions,
          EvaluationPeriods: element.evaluationPeriods,
          DatapointsToAlarm: element.datapointsToAlarm,
          Threshold: element.threshold,
          ComparisonOperator: element.comparisonOperator,
          TreatMissingData: element.treatMissingData,
          Metrics: element.metrics
        }
      }
    } 
  }
}
module.exports = Alarms;

