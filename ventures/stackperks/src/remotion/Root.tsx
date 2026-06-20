/* eslint-disable @typescript-eslint/no-explicit-any */
import { Composition } from 'remotion';
import { MintbrooksTikTok } from './MintbrooksTikTok';

const carEquityScript = {
  hookText: 'Your car is worth\nup to $10,000\nin credit.',
  bodyPoints: [
    'No credit score needed',
    'No cash deposit required',
    'Keep driving your car',
    'Real Visa credit card',
  ],
  ctaText: 'Link in bio — check if your car qualifies',
};

const bankSaysNoScript = {
  hookText: 'What happens when\nevery bank\nsays no?',
  bodyPoints: [
    'Bad credit? Been rejected?',
    'Your car has hidden value',
    'Use your equity, not your score',
    'Up to $10,000 credit line',
  ],
  ctaText: 'Link in bio — see what your car unlocks',
};

const creditSystemBrokenScript = {
  hookText: "Banks don't want\nyou to know this.",
  bodyPoints: [
    'They profit from your bad credit',
    'Secured cards need $200+ deposits',
    'But your car has untapped equity',
    'A different kind of collateral',
  ],
  ctaText: 'Link in bio — the credit hack they hide',
};

const stateAvailabilityScript = {
  hookText: 'Does your state\nqualify?',
  bodyPoints: [
    'Available in 37 states',
    'Excluded: AK HI IA LA ME MD',
    'MA MN MO NJ NY OK SD WI',
    'Check in 30 seconds — soft pull only',
  ],
  ctaText: 'Link in bio — check your state now',
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CarEquitySecret"
        component={MintbrooksTikTok as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={carEquityScript}
      />
      <Composition
        id="BankSaysNo"
        component={MintbrooksTikTok as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={bankSaysNoScript}
      />
      <Composition
        id="CreditSystemBroken"
        component={MintbrooksTikTok as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={creditSystemBrokenScript}
      />
      <Composition
        id="StateAvailability"
        component={MintbrooksTikTok as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={stateAvailabilityScript}
      />
    </>
  );
};
