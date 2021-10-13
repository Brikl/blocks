import { Answer, sitetype } from './interface/choice';
import { githubActions,} from './actions/github.actions';


export async function blocks(): Promise<any> {
    if (Answer.site_type === sitetype.NEXTJS_STATIC) {
        return await githubActions();
    }
}
