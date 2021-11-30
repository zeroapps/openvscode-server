/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { extensions } from 'vscode';
import { API as GitAPI, GitExtension } from './api/git';

export class GitBaseApi {

	private static _gitBaseApi: GitAPI | undefined;

	static getAPI(): GitAPI {
		if (!this._gitBaseApi) {
			const gitExtension = extensions.getExtension<GitExtension>('vscode.git')!.exports;
			const onDidChangeGitBaseExtensionEnablement = (enabled: boolean) => {
				this._gitBaseApi = enabled ? gitExtension.getAPI(1) : undefined;
			};

			gitExtension.onDidChangeEnablement(onDidChangeGitBaseExtensionEnablement);
			onDidChangeGitBaseExtensionEnablement(gitExtension.enabled);

			if (!this._gitBaseApi) {
				throw new Error('vscode.git extension is not enabled.');
			}
		}

		return this._gitBaseApi;
	}
}
