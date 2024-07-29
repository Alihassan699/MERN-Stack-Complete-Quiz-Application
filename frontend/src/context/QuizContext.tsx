import React, { createContext, useState } from 'react';

interface QuizContextProps {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
}

export const QuizContext = createContext<QuizContextProps>({
    user: '',
    setUser: () => {},
});

export const QuizProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<string>('');

    return (
        <QuizContext.Provider value={{ user, setUser }}>
            {children}
        </QuizContext.Provider>
    );
};
