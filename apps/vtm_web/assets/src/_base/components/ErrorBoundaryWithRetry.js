// @flow

import React from "react";
import {log} from "../utils";
import {check} from "../../services/login-service";

export type Props = {
    onRetry?: ?() => void;
    onUnauthorized: () => void;
    children: any;
    fallback?: ?({
        error: Error,
        retry: () => void
    }) => void;
}

export type State = {
    hasError: boolean;
    errorInfo?: ?any;
    error?: ?Error;
    fetchKey: number;
}

const FallbackScreen = (errorInfo: any) =>
    <div className="card my-5">
        <div className="card-header">
            <p>
                There was an error in loading this page.{' '}
                <span
                    style={{ cursor: 'pointer', color: '#0077FF' }}
                    onClick={() => {
                        window.location.reload();
                    }}
                >
            Reload this page
          </span>{' '}
            </p>
        </div>
        <div className="card-body">
            <details className="error-details">
                <summary>Click for error details</summary>
                {errorInfo && errorInfo.componentStack.toString()}
            </details>
        </div>
    </div>;

export class ErrorBoundaryWithRetry extends React.Component<Props, State> {
    state: any = {
        hasError: false,
        error: null,
        errorInfo: null,
        fetchKey: 0};

    static getDerivedStateFromError(error: any): State {
        log("error at catcher level", error, "error");
        return {
            hasError: error != null,
            error: error,
            fetchKey: 0
        };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        log("error at component level", error, "error");
        this.setState({
            errorInfo
        })
    }

    _retry: () => void = () => {
        if (this.props.onRetry) {
            this.props.onRetry();
            this.setState({
                error: null
            });
        }
    }

    render(): any {
        const {children, fallback} = this.props;
        const { error, errorInfo, hasError } = this.state;

        if (hasError && (error || errorInfo)) {
            log("There was an error in the app", error, "error");
            log("Error info", errorInfo, "error");

            check()
                .then(m => {
                    log("check login response", m);
                })
                .catch(e => {
                    log("check login error", e, "error");
                    this.props.onUnauthorized();
                });

            if (typeof fallback === 'function') {
                return fallback({error, retry: this._retry});
            }

            return (<FallbackScreen errorInfo={errorInfo} />);
        }

        return children;
    }
}