interface File {
	name: string;
	isDirectory: boolean;
	path: string;
	parentDir?: string;
}

export default File;