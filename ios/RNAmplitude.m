
#import "RNAmplitude.h"
#import "Amplitude.h"
#import "RCTLog.h"

@implementation RNAmplitude

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logEvent:(NSString *)eventwithProperties:(NSDictionary *)properties) {
 [[Amplitude instance] logEvent:eventwithProperties withEventProperties:properties];
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId) {
 [[Amplitude instance] setUserId:userId];
}

@end
