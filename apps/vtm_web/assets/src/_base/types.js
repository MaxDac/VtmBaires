// @flow

export type History = {
    push: string => void;
};

export type DefaultComponentProps = {
    setError: (string, string) => void;
}
