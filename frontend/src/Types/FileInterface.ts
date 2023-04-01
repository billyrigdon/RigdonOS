interface File {
	name: string;
	isDirectory: boolean;
	path: string;
	parentDir?: string;
	txtContents: string | null;
}

export default File;