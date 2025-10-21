import CommunityIcon from "../../assets/community-icon.svg";

const loadAsImageData = async (url: string): Promise<HTMLImageElement> => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = () => resolve(img);
    });
}


export { CommunityIcon }
export const Community = loadAsImageData(CommunityIcon);