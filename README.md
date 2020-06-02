# serverless-plugin-aws-alarm

This plugin allows to use serverless framework to deploy alarms of MetricDataQuery for AWS CloudWatch.

To use this plugin, please specify the following

Disclaimer: This tool only allows the integration of MetricDataQuery feature with serverless framework, please refer to the following documentations for the technical detail on cloudformation and cloudwatch

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cw-alarm.html#cfn-cloudwatch-alarms-alarmactions
https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricAlarm.html
https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDataQuery.html

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
