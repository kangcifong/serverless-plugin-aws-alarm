# serverless-plugin-aws-alarm

This plugin allows to use serverless framework to deploy alarm for AWS CloudWatch.

To use this plugin, please specify the following

```
plugins:
  - serverless-plugin-aws-alarm

custom:
  alarms:
    alarmId:
      alarmName: alarm-name
      alarmDescription: 'test description on serverless plugin'
      actionsEnabled: true
      alarmActions:
        - arn:aws:sns:region:123456789012:alarm
      okActions:
        - arn:aws:sns:region:123456789012:ok
      evaluationPeriods: 1
      datapointsToAlarm: 1
      threshold: 5.0
      comparisonOperator: GreaterThanOrEqualToThreshold
      treatMissingData: 'missing'
      metrics:
        - Id: metric_UniqueContributors
          Expression: INSIGHT_RULE_METRIC('contributor-insight-rule', 'UniqueContributors')
          Label: label
          Period: 300
```
