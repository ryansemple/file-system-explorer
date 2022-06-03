export const formatDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	return new Intl.DateTimeFormat('en-CA', options).format(date);
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
	const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const bytesInKilobyte: number = 1024;
	let i: number = 0;

	for (i; bytes > bytesInKilobyte; i++) {
		bytes /= bytesInKilobyte;
	}

	return `${parseFloat(bytes.toFixed(decimals))} ${units[i]}`;
};
