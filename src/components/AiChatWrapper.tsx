import { useState } from 'react';
import { AiChat } from './AiChat';
import { AiChatButton } from './AiChatButton';

interface Props {
  knownLang: string;
  learningLang: string;
  featureContext?: string;
}

export function AiChatWrapper({ knownLang, learningLang, featureContext }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AiChat
        isOpen={isOpen}
        knownLang={knownLang}
        learningLang={learningLang}
        featureContext={featureContext}
      />
      <AiChatButton isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />
    </>
  );
}
