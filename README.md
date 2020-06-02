# serverless-plugin-aws-alarm

This plugin allows to use serverless framework to deploy alarm for AWS CloudWatch.

To use this plugin, please specify the following

```
plugins:
  - serverless-plugin-aws-alarm

custom:
  alarms:
    alarmId:
      actionEnabled: true #Optional true|false
      alarmActions:
        - arn:aws:sns:region:123456789012:alarm
      alarmDescription: 'test description on serverless plugin' #Optional, String 0...1024
      alarmName: alarm-name #Optional, if not assigned, unique physical id will be generated.
      comparisonOperator: GreaterThanOrEqualToThreshold #REQ GreaterThanOrEqualToThreshold | GreaterThanThreshold | GreaterThanUpperThreshold | LessThanLowerOrGreaterThanUpperThreshold | LessThanLowerThreshold | LessThanOrEqualToThreshold | LessThanThreshold
      datapointsToAlarm: 1
      evaluationPeriods: 1 #REQ, Int 1...
      insufficientDataActions:
        - arn:aws:sns:region:123456789012:insuffientData
      metrics:
        - Expression: INSIGHT_RULE_METRIC('contributor-insight-rule', 'UniqueContributors')
          Id: metric_UniqueContributors #REQ [a-z][a-zA-Z_]+
          Label: label #OPT
          Period: 300 #REQ by experiment
      okActions:
        - arn:aws:sns:region:123456789012:ok
      threshold: 5.0 #OPT, Double
      treatMissingData: 'missing' #OPT, breaching | notBreaching | ignore| missing

```
