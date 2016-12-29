
#import "RNAmplitude.h"
#import "Amplitude.h"
#import "RCTLog.h"

@implementation RNAmplitude

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logEvent:(NSString *)eventwithProperties:(NSDictionary *)properties) {
 [[Amplitude instance] logEvent:eventwithProperties:properties];
 RCTLogInfo(@"Pretending to create an event %@ at %@", eventwithProperties, properties);
}

@end
