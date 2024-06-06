import CommunityIcon from "../../assets/noun-community-39138.svg";

const loadAsImageData = async (url: string): Promise<HTMLImageElement> => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = () => resolve(img);
    });
}


export const Community = loadAsImageData(CommunityIcon);