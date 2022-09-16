import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from 'react-bootstrap/esm/Button';
import Typography from '@mui/material/Typography';

export default function MediumCard() {
  return (
    <Card sx={{ margin:5, width: 600,height:260 }}>
      <CardMedia
        component="img"
        alt="SD M.2 Samsung 980 PRO"
        height="120" 
        width="600"
        image="https://m.media-amazon.com/images/I/81bBCWykGtL._AC_SL1500_.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        SD M.2 Samsung 980 PRO
        </Typography>
        <Typography variant="body2" color="text.secondary">
        SSD M.2 Samsung 980 PRO 1TB PCIe NVMe Gen4 interno para juegos (MZ-V8P1T0B)
        </Typography>
      </CardContent>
      <CardActions>
      <Button  target="_blank" href="https://www.amazon.com/Samsung-PCIe-interno-juegos-MZ-V8P1T0B/dp/B08GLX7TNT/ref=sxin_14_pa_sp_search_thematic_sspa?content-id=amzn1.sym.a1dd6248-8b51-4ef7-9dfb-d3cf41015b4b%3Aamzn1.sym.a1dd6248-8b51-4ef7-9dfb-d3cf41015b4b&cv_ct_cx=nvme+m.2+hard+drive&keywords=nvme+m.2+hard+drive&pd_rd_i=B08GLX7TNT&pd_rd_r=db457f1c-7ddc-46b2-aa22-5b17811ebb17&pd_rd_w=y8Ted&pd_rd_wg=Nx2Jh&pf_rd_p=a1dd6248-8b51-4ef7-9dfb-d3cf41015b4b&pf_rd_r=C3G67TXX3FTWX20XSMNJ&qid=1654920312&sprefix=disco+duro+n%2Caps%2C116&sr=1-1-a73d1c8c-2fd2-4f19-aa41-2df022bcb241-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExMjlGUFBaUTc2R1dMJmVuY3J5cHRlZElkPUEwNDAzNDY2MVdKQjRDQ1paVTlVSCZlbmNyeXB0ZWRBZElkPUEwODY5Mzk4M0hOQ0lSR0RCMVM5USZ3aWRnZXROYW1lPXNwX3NlYXJjaF90aGVtYXRpYyZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=" variant="primary">Comprar</Button>
      </CardActions>
    </Card>
  );
}